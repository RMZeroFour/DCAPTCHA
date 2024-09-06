from datetime import datetime
from starlette.requests import Request

import model_inference as mi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI(debug = True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"message": "Hello World -20240331 "  + str(datetime.now())}
@app.post("/predict/")
async def get_predictions(r:Request):
    try :
        data=await r.json()
        time_taken=data['time_taken']
        typing_speed=data['typing_speed']
        mouse_movement=data['mouse_movement']
        mouse_distance=data['mouse_distance']
        country=data['country']
        city=data['city']
        is_proxy=data['is_proxy']
        result=mi.model_inference(time_taken,typing_speed,mouse_movement,mouse_distance,country,city,is_proxy)
        if result>0.7:
            return {"Status":"Success","result":"Human"}
        elif 0.7>=result>=0.3:
            return {"Status":"Success","result":"Not Sure"}
        else:
            return {"Status":"Success","result":"Bot"}
    except Exception as e:
        return {"Status":"Error","result":str(e)}
if __name__ == "__main__":
    uvicorn.run(app)