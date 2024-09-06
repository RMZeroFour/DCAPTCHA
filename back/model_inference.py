import numpy as np
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
from catboost import CatBoostClassifier
import tensorflow as tf
from tensorflow.keras import layers
def neural_model():
    model=tf.keras.Sequential([
        layers.InputLayer(shape=(7,)),
        layers.Dense(32),
        layers.Dense(16, activation='relu'),
        layers.Dense(8),
        layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model
def gate_nn():
    model=tf.keras.Sequential([
        layers.InputLayer(shape=(3,)),
        layers.Dense(32),
        layers.Dense(16, activation='relu'),
        layers.Dense(8),
        layers.Dense(1, activation='sigmoid')
    ])

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model
NN_MODEL = neural_model()
NN_MODEL.load_weights('D:\DCAPTCHA\model\demo_weights_neural.weights.h5')
XGB_MODEL = xgb.XGBClassifier()
XGB_MODEL.load_model('D:\DCAPTCHA\model\demo_weights_xgboost.json')
CAT_MODEL = CatBoostClassifier()
CAT_MODEL.load_model('D:\DCAPTCHA\model\demo_weights_catboost.json')
GATE_MODEL =gate_nn()
GATE_MODEL.load_weights('D:\DCAPTCHA\model\demo_weights_gate.weights.h5')

COUNTRY_ENCODER = LabelEncoder()
COUNTRY_ENCODER.classes_ = np.load('D:\DCAPTCHA\model\country_label_enc.npy',allow_pickle=True)
CITY_ENCODER = LabelEncoder()
CITY_ENCODER.classes_ = np.load('D:\DCAPTCHA\model\city.npy',allow_pickle=True)
PROXY_ENCODER = LabelEncoder()
PROXY_ENCODER.classes_ = np.load('D:\DCAPTCHA\model\isProxy.npy',allow_pickle=True)
def model_inference(time_taken,typing_speed,mouse_movement,mouse_distance,country,city,is_proxy):
    country = COUNTRY_ENCODER.transform([country])[0]
    city = CITY_ENCODER.transform([city])[0]
    is_proxy = PROXY_ENCODER.transform([is_proxy])[0]
    data = np.array([time_taken,typing_speed,mouse_movement,mouse_distance,country,city,is_proxy]).reshape(1,7)
    nn_pred = NN_MODEL.predict(data)
    xgb_pred = XGB_MODEL.predict_proba(data)
    cat_pred = CAT_MODEL.predict_proba(data)
    gate_data = np.array([nn_pred[0][0],xgb_pred[0][0],cat_pred[0][0]]).reshape(1,3)
    gate_pred = GATE_MODEL.predict(gate_data)
    return gate_pred[0][0]