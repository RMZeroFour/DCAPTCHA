from datetime import datetime
import json
from os import environ
from pymongo import MongoClient
from starlette.requests import Request
import model_inference as mi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import base64
import uvicorn
import matplotlib.pyplot as plt
from dotenv import load_dotenv
load_dotenv(override=True)
mongo_uri = environ.get("MONGO_URI")
captcha_digits = int(environ.get("CAPTCHA_DIGITS"))
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
SERVER_START_TIME = datetime.now()
@app.get("/")
async def root():
    return {"message": "Server Started at : " + str(SERVER_START_TIME)}
@app.post("/predict/layer_one/")
async def get_predictions_layer_one(req: Request):
    data=await req.json()
    time_taken = data['time_taken']
    typing_speed = data['typing_speed']
    mouse_distance = data['mouse_distance']
    country = data['country']
    state = data['state']
    is_proxy = data['is_proxy']
    is_abuser = data['is_abuser']
    user_agent = req.headers['user-agent']

    database = client.flow_data
    collection = database.layer_data

    try :
        prediction=mi.model_inference_layer_1(time_taken,typing_speed,mouse_distance,country,state,is_proxy,is_abuser,user_agent)
        if prediction < 0.2:
            collection.update_one({"layer": 1}, {"$inc": {"bot": 1}})
            return {"Status": "Success", "result": "Bot"}
        elif 0.2 <= prediction < 0.8:
            collection.update_one({"layer": 1}, {"$inc": {"not_sure": 1}})
            return {"Status": "Success", "result": "Not Sure"}
        else:
            collection.update_one({"layer": 1}, {"$inc": {"human": 1}})
            return {"Status": "Success", "result": "Human"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}
@app.post("/predict/layer_two/")
async def get_predictions_layer_two(req: Request):
    data=await req.json()
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    country = data['country']
    state = data['state']
    is_proxy = data['is_proxy']
    is_abuser = data['is_abuser']
    user_agent = req.headers['user-agent']
    is_solved = data['is_solved']
    try :
        prediction=mi.model_inference_layer_2(time_taken,mouse_distance,country,state,is_proxy,is_abuser,user_agent,is_solved)
        database = client.flow_data
        collection = database.layer_data
        if prediction < 0.2:
            collection.update_one({"layer": 2}, {"$inc": {"bot": 1}})
            return {"Status": "Success", "result": "Bot"}
        elif 0.2 <= prediction < 0.8:
            collection.update_one({"layer": 2}, {"$inc": {"not_sure": 1}})
            return {"Status": "Success", "result": "Not Sure"}
        else:
            collection.update_one({"layer": 2}, {"$inc": {"human": 1}})
            return {"Status": "Success", "result": "Human"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.post("/predict/layer_three/")
async def get_predictions_layer_three(req: Request):
    data=await req.json()
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    country = data['country']
    state = data['state']
    is_proxy = data['is_proxy']
    is_abuser = data['is_abuser']
    user_agent = req.headers['user-agent']
    problem_solved = data['problem_solved']

    try :
        prediction=mi.model_inference_layer_3(time_taken,mouse_distance,country,state,is_proxy,is_abuser,user_agent,problem_solved)
        database = client.flow_data
        collection = database.layer_data
        if prediction < 0.2:
            collection.update_one({"layer": 3}, {"$inc": {"bot": 1}})
            return {"Status": "Success", "result": "Bot"}
        elif 0.2 <= prediction < 0.8:
            collection.update_one({"layer": 3}, {"$inc": {"not_sure": 1}})
            return {"Status": "Success", "result": "Not Sure"}
        else:
            collection.update_one({"layer": 3}, {"$inc": {"human": 1}})
            return {"Status": "Success", "result": "Human"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.get("/captcha_image/")
async def get_captcha_image():
    answer = ''
    for _ in range(captcha_digits):
        img, ans = mi.get_adv_image(0.2)
        if _ == 0:

            image=np.array(img[0])
        else :
            image=np.hstack((image, np.array(img[0])))
        answer+=str(ans)
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


@app.post("/training_data/layer_one/")
async def collect_layer_1_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    typing_speed = data['typing_speed']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    is_bot = data['is_bot']
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
            "is_bot": is_bot
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}


@app.post("/training_data/layer_two/")
async def collect_layer_2_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    is_solved = data['is_solved']
    is_bot = data['is_bot']
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
            "is_bot": is_bot
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}


@app.post("/training_data/layer_three/")
async def collect_layer_3_data(req: Request):
    data = await req.json()
    is_abuser = data['is_abuser']
    time_taken = data['time_taken']
    mouse_distance = data['mouse_distance']
    is_proxy = data['is_proxy']
    state = data['state']
    country = data['country']
    problem_solved = data['problem_solved']
    is_bot = data['is_bot']
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
            "is_bot": is_bot
        })
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.get("/config/layers/")
async def get_config():
    try :
        with open("layers_config.json", "r") as file:
            data = json.load(file)
        return {"Status": "Success", "data": data}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.post("/config/layers/")
async def update_config(req: Request):
    try :
        data = await req.json()
        with open("layers_config.json", "w") as file:
            json.dump(data, file, indent=4)
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.get("/config/data_collection/")
async def get_config():
    try :
        with open("data_collection_config.json", "r") as file:
            data = json.load(file)
        return {"Status": "Success", "data": data}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.post("/config/data_collection/")
async def update_config(req: Request):
    try :
        data = await req.json()
        with open("data_collection_config.json", "w") as file:
            json.dump(data, file, indent=4)
        return {"Status": "Success"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.post("/authenticate/")
async def user_auth(req: Request):
    try:
        data = await req.json()
        username = data['username']
        password = data['password']
        database = client.dashboard
        collection = database.users
        result = collection.find_one({"username": username, "password": password})
        if result:
            return {"Status": "Success", "result": True}
        else:
            return {"Status": "Error", "result": False}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.post("/create_user/")
async def create_user(req: Request):
    try:
        data = await req.json()
        username = data['username']
        password = data['password']
        database = client.dashboard
        collection = database.users
        result = collection.find_one({"username": username})
        if result:
            return {"Status": "Error", "message": "User Already Exists"}
        else:
            collection.insert_one({"username": username, "password": password})
            return {"Status": "Success", "message": "User Created"}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.get("/analytics/layer_one/")
async def get_layer_one_data():
    try:
        database = client.flow_data
        collection = database.layer_data
        data=collection.find_one({"layer": 1})
        data.pop("_id")
        return {"Status": "Success", "data": data}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}

@app.get("/analytics/layer_two/")
async def get_layer_two_data():
    try:
        database = client.flow_data
        collection = database.layer_data
        data=collection.find_one({"layer": 2})
        data.pop("_id")
        return {"Status": "Success", "data": data}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}
@app.get("/analytics/layer_three/")
async def get_layer_three_data():
    try:
        database = client.flow_data
        collection = database.layer_data
        data=collection.find_one({"layer": 3})
        data.pop("_id")
        return {"Status": "Success", "data": data}
    except Exception as e:
        return {"Status": "Error", "message": str(e)}
if __name__ == "__main__":
    uvicorn.run(app)