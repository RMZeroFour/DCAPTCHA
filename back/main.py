from datetime import datetime
from dotenv import dotenv_values
from starlette.requests import Request
import model_inference as mi
from pymongo import MongoClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from io import BytesIO
import numpy as np
import base64
import uvicorn
import matplotlib.pyplot as plt

config = dotenv_values('.env')
mongo_url = config['MONGO_URI']
cipher_key = int(config['CIPHER_KEY'])
cipher_mod = int(config['CIPHER_MOD'])
captcha_digits = int(config['CAPTCHA_DIGITS'])

app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World -20240331 " + str(datetime.now())}

@app.post("/predict/")
async def get_predictions(req: Request):
    try:
        data = await req.json()
        time_taken = data['time_taken']
        typing_speed = data['typing_speed']
        mouse_movement = data['mouse_movement']
        mouse_distance = data['mouse_distance']
        country = data['country']
        city = data['city']
        is_proxy = data['is_proxy']
        client = MongoClient(mongo_url)
        db = client.sih
        users_collection = db.sih_level_1
        users_collection.insert_one(data)
        result = mi.model_inference(
            time_taken, typing_speed, mouse_movement, mouse_distance, country, city, is_proxy)
        if result > 0.7:
            return {"Status": "Success", "result": "Human"}
        elif 0.7 >= result >= 0.3:
            return {"Status": "Success", "result": "Not Sure"}
        else:
            return {"Status": "Success", "result": "Bot"}
    except Exception as e:
        return {"Status": "Error", "result": str(e)}

@app.get("/captcha_image/")
async def get_captcha_image():
    answer = 0
    for _ in range(captcha_digits):
        img, ans = mi.get_adv_image(0.2)
        if _ == 0:
            image=np.array(img[0])
        else :
            image=np.hstack((image, np.array(img[0])))
        answer = (answer * 10) + ((ans + cipher_key) % cipher_mod)
    plt.imsave("captcha.png", image, cmap='gray')
    with open("captcha.png", "rb") as png_file:
        png_data = png_file.read()
        base64_encoded = base64.b64encode(png_data).decode('utf-8')
    data_uri = f"data:image/png;base64,{base64_encoded}"
    return {
        "Status": "Success",
        "image": data_uri,
        "answer": answer
    }

if __name__ == "__main__":
    uvicorn.run(app)