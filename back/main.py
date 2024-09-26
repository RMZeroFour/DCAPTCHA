from datetime import datetime
from os import environ
from pymongo import MongoClient
from starlette.requests import Request
# import model_inference as mi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# import numpy as np
# import base64
import uvicorn
# import matplotlib.pyplot as plt

captcha_digits = 3
mongo_uri = 'mongodb+srv://Hemant_MongoDB_071:Hemant%40MongoDB%40071@hemant-mongodb-071.150fkzd.mongodb.net/'
# environ.get("MONGO_URI")
try:
    client = MongoClient(mongo_uri)
except Exception as e:
    print(f"Error in connecting to the database: \n {e}")
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

# @app.post("/predict/")
# async def get_predictions(req: Request):
#     try :
#         data = await req.json()
#         time_taken = data['time_taken']
#         typing_speed = data['typing_speed']
#         mouse_distance = data['mouse_distance']
#         country = data['country']
#         city = data['city']
#         is_proxy = data['is_proxy']
#         result = mi.model_inference(
#             time_taken, typing_speed, mouse_distance, country, city, is_proxy)
#         if result > 0.8:
#             print(result)
#             return {"Status": "Success", "result": "Bot"}
#         elif 0.8 >= result >= 0.2:
#             print(result)
#             return {"Status": "Success", "result": "Not Sure"}
#         else:
#             print(result)
#             return {"Status": "Success", "result": "Human"}
#     except Exception as e:
#         return {"Status": "Error", "message": str(e)}

# @app.get("/captcha_image/")
# async def get_captcha_image():
#     answer = ''
#     for _ in range(captcha_digits):
#         img, ans = mi.get_adv_image(0.2)
#         if _ == 0:

#             image=np.array(img[0])
#         else :
#             image=np.hstack((image, np.array(img[0])))
#         answer+=str(ans)
#     plt.imsave("captcha.png", image, cmap='gray')
#     with open("captcha.png", "rb") as png_file:
#         png_data = png_file.read()
#         base64_encoded = base64.b64encode(png_data).decode('utf-8')
#     data_uri = f"data:image/png;base64,{base64_encoded}"
#     return {
#         "Status": "Success",
#         "image": data_uri,
#         "answer": answer
#     }


@app.post("/collect_data_layer_one/")
async def collect_layer_1_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    typing_speed = data['typing_speed']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    user_agent = req.headers['user-agent']
    try:
        database = client.training_data
        collection = database.layer_one
        collection.insert_one({
            "is_abuser": is_abuser,
            "time_taken": time_taken,
            "typing_speed": typing_speed,
            "mouse_distance": mouse_distance,
            "is_proxy": is_proxy,
            "state": state,
            "country": country,
            "user_agent": user_agent,
            "is_bot": True
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}


@app.post("/collect_data_layer_two/")
async def collect_layer_2_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    is_solved = data['is_solved']
    user_agent = req.headers['user-agent']
    try:
        database = client.training_data
        collection = database.layer_two
        collection.insert_one({
            "is_abuser": is_abuser,
            "time_taken": time_taken,
            "mouse_distance": mouse_distance,
            "is_proxy": is_proxy,
            "state": state,
            "country": country,
            "is_solved": is_solved,
            "user_agent": user_agent,
            "is_bot": True
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}


@app.post("/collect_data_layer_three/")
async def collect_layer_3_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    problem_solved = data['problem_solved']
    user_agent = req.headers['user-agent']
    try:
        database = client.training_data
        collection = database.layer_three
        collection.insert_one({
            'is_abuser': is_abuser,
            'time_taken': time_taken,
            'mouse_distance': mouse_distance,
            'is_proxy': is_proxy,
            'state': state,
            'country': country,
            'problem_solved': problem_solved,
            'user_agent': user_agent,
            "is_bot": True
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}
if __name__ == "__main__":
    uvicorn.run(app)
