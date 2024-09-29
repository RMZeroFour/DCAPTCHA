import numpy as np
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
from catboost import CatBoostClassifier
import tensorflow as tf
from tensorflow.keras import layers
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import datasets, transforms
from lightgbm import LGBMClassifier
from user_agents import parse
import joblib

def parse_user_agent(ua_string):
    ua = parse(ua_string)
    return {
        'browser_family': ua.browser.family,
        'browser_version': ua.browser.version_string,
        'os_family': ua.os.family,
        'os_version': ua.os.version_string,
        'device_family': ua.device.family,
        'is_mobile': ua.is_mobile,
        'is_tablet': ua.is_tablet,
        'is_pc': ua.is_pc,

    }
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
# Layer 1

LGBM_MODEL_LAYER_1 = joblib.load('../model/Level _1/lgbm_model.joblib')
XGB_MODEL_LAYER_1 = xgb.XGBClassifier()
XGB_MODEL_LAYER_1.load_model('../model/Level _1/demo_weights_xgboost.json')
CAT_MODEL_LAYER_1 = CatBoostClassifier()
CAT_MODEL_LAYER_1.load_model('../model/Level _1/demo_weights_catboost.json')
GATE_MODEL_LAYER_1 =gate_nn()
GATE_MODEL_LAYER_1.load_weights('../model/Level _1/demo_weights_gate.weights.h5')

COUNTRY_ENCODER_LAYER_1 = LabelEncoder()
COUNTRY_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/country_label_encoder.joblib',allow_pickle=True)
STATE_ENCODER_LAYER_1 = LabelEncoder()
STATE_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/city_label_encoder.joblib',allow_pickle=True)
PROXY_ENCODER_LAYER_1 = LabelEncoder()
PROXY_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/proxy_label_encoder.joblib',allow_pickle=True)
BROWSER_FAMILY_ENCODER_LAYER_1 = LabelEncoder()
BROWSER_FAMILY_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/browser_family_label_encoder.joblib',allow_pickle=True)
BROWSER_VERSION_ENCODER_LAYER_1 = LabelEncoder()
BROWSER_VERSION_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/browser_version_label_encoder.joblib',allow_pickle=True)
OS_FAMILY_ENCODER_LAYER_1 = LabelEncoder()
OS_FAMILY_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/os_family_label_encoder.joblib',allow_pickle=True)
OS_VERSION_ENCODER_LAYER_1 = LabelEncoder()
OS_VERSION_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/os_version_label_encoder.joblib',allow_pickle=True)
DEVICE_FAMILY_ENCODER_LAYER_1 = LabelEncoder()
DEVICE_FAMILY_ENCODER_LAYER_1.classes_ = np.load('../model/Level _1/device_family_label_encoder.joblib',allow_pickle=True)
def model_inference_layer_1(time_taken,typing_speed,mouse_distance,country,state,is_proxy,is_abuser,user_agent):
    country = COUNTRY_ENCODER_LAYER_1.transform([country])[0]
    state = STATE_ENCODER_LAYER_1.transform([state])[0]
    is_proxy = PROXY_ENCODER_LAYER_1.transform([is_proxy])[0]
    is_abuser = 1 if is_abuser else 0
    ua = parse_user_agent(user_agent)
    browser_family = BROWSER_FAMILY_ENCODER_LAYER_1.transform([ua['browser_family']])[0]
    browser_version = BROWSER_VERSION_ENCODER_LAYER_1.transform([ua['browser_version']])[0]
    os_family = OS_FAMILY_ENCODER_LAYER_1.transform([ua['os_family']])[0]
    os_version = OS_VERSION_ENCODER_LAYER_1.transform([ua['os_version']])[0]
    device_family = DEVICE_FAMILY_ENCODER_LAYER_1.transform([ua['device_family']])[0]
    is_mobile = 1 if ua['is_mobile'] else 0
    is_tablet = 1 if ua['is_tablet'] else 0
    is_pc = 1 if ua['is_pc'] else 0
    data=np.array([is_abuser,time_taken,typing_speed,mouse_distance,state,country,browser_family,browser_version,os_family,os_version,device_family,is_mobile,is_tablet,is_pc]).reshape(1,14)
    lgbm_pred = LGBM_MODEL_LAYER_1.predict_proba(data)
    xgb_pred = XGB_MODEL_LAYER_1.predict_proba(data)
    cat_pred = CAT_MODEL_LAYER_1.predict_proba(data)
    gate_data = np.array([xgb_pred[0][0],cat_pred[0][0],lgbm_pred[0][0]]).reshape(1,3)
    gate_pred = GATE_MODEL_LAYER_1.predict(gate_data)
    return gate_pred[0][0]
## bot
print(model_inference_layer_1(7.958,2.272257798,46.01086828,'India','Haryana','false',False,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'))
## human
print(model_inference_layer_1(3.959,6.756756757,487.4600438,'India','Delhi','false',False,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'))
# Layer 2
LGBM_MODEL_LAYER_2 = joblib.load('../model/Level_2/lgbm_model.joblib')
XGB_MODEL_LAYER_2 = xgb.XGBClassifier()
XGB_MODEL_LAYER_2.load_model('../model/Level_2/demo_weights_xgboost.json')
CAT_MODEL_LAYER_2 = CatBoostClassifier()
CAT_MODEL_LAYER_2.load_model('../model/Level_2/demo_weights_catboost.json')
GATE_MODEL_LAYER_2 =gate_nn()
GATE_MODEL_LAYER_2.load_weights('../model/Level_2/demo_weights_gate.weights.h5')

COUNTRY_ENCODER_LAYER_2 = LabelEncoder()
COUNTRY_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/country_label_encoder.joblib',allow_pickle=True)
STATE_ENCODER_LAYER_2 = LabelEncoder()
STATE_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/city_label_encoder.joblib',allow_pickle=True)
PROXY_ENCODER_LAYER_2 = LabelEncoder()
PROXY_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/proxy_label_encoder.joblib',allow_pickle=True)
BROWSER_FAMILY_ENCODER_LAYER_2 = LabelEncoder()
BROWSER_FAMILY_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/browser_family_label_encoder.joblib',allow_pickle=True)
BROWSER_VERSION_ENCODER_LAYER_2 = LabelEncoder()
BROWSER_VERSION_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/browser_version_label_encoder.joblib',allow_pickle=True)
OS_FAMILY_ENCODER_LAYER_2 = LabelEncoder()
OS_FAMILY_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/os_family_label_encoder.joblib',allow_pickle=True)
OS_VERSION_ENCODER_LAYER_2 = LabelEncoder()
OS_VERSION_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/os_version_label_encoder.joblib',allow_pickle=True)
DEVICE_FAMILY_ENCODER_LAYER_2 = LabelEncoder()
DEVICE_FAMILY_ENCODER_LAYER_2.classes_ = np.load('../model/Level_2/device_family_label_encoder.joblib',allow_pickle=True)
def model_inference_layer_2(time_taken,mouse_distance,country,state,is_proxy,is_abuser,user_agent,is_solved):
    country = COUNTRY_ENCODER_LAYER_2.transform([country])[0]
    state = STATE_ENCODER_LAYER_2.transform([state])[0]
    is_proxy = PROXY_ENCODER_LAYER_2.transform([is_proxy])[0]
    is_abuser = 1 if is_abuser else 0
    ua = parse_user_agent(user_agent)
    browser_family = BROWSER_FAMILY_ENCODER_LAYER_2.transform([ua['browser_family']])[0]
    browser_version = BROWSER_VERSION_ENCODER_LAYER_2.transform([ua['browser_version']])[0]
    os_family = OS_FAMILY_ENCODER_LAYER_2.transform([ua['os_family']])[0]
    os_version = OS_VERSION_ENCODER_LAYER_2.transform([ua['os_version']])[0]
    device_family = DEVICE_FAMILY_ENCODER_LAYER_2.transform([ua['device_family']])[0]
    is_mobile = 1 if ua['is_mobile'] else 0
    is_tablet = 1 if ua['is_tablet'] else 0
    is_pc = 1 if ua['is_pc'] else 0
    is_solved = 1 if is_solved else 0
    data=np.array([is_abuser,time_taken,mouse_distance,state,country,is_solved,browser_family,browser_version,os_family,os_version,device_family,is_mobile,is_tablet,is_pc]).reshape(1,14)
    lgbm_pred = LGBM_MODEL_LAYER_2.predict_proba(data)
    xgb_pred = XGB_MODEL_LAYER_2.predict_proba(data)
    cat_pred = CAT_MODEL_LAYER_2.predict_proba(data)
    gate_data = np.array([xgb_pred[0][0],cat_pred[0][0],lgbm_pred[0][0]]).reshape(1,3)
    gate_pred = GATE_MODEL_LAYER_2.predict(gate_data)
    return gate_pred[0][0]
## bot
print(model_inference_layer_2(3.411,415.9695575,'India','Haryana','false',False,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',False))
## human
print(model_inference_layer_2(4.649,1093.685516,'India','Delhi','false',False,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',True))
# Layer 3
LGBM_MODEL_LAYER_3 = joblib.load('../model/Level_3/lgbm_model.joblib')
XGB_MODEL_LAYER_3 = xgb.XGBClassifier()
XGB_MODEL_LAYER_3.load_model('../model/Level_3/demo_weights_xgboost.json')
CAT_MODEL_LAYER_3 = CatBoostClassifier()
CAT_MODEL_LAYER_3.load_model('../model/Level_3/demo_weights_catboost.json')
GATE_MODEL_LAYER_3 =gate_nn()
GATE_MODEL_LAYER_3.load_weights('../model/Level_3/demo_weights_gate.weights.h5')

COUNTRY_ENCODER_LAYER_3 = LabelEncoder()
COUNTRY_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/country_label_encoder.joblib',allow_pickle=True)
STATE_ENCODER_LAYER_3 = LabelEncoder()
STATE_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/city_label_encoder.joblib',allow_pickle=True)
PROXY_ENCODER_LAYER_3 = LabelEncoder()
PROXY_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/proxy_label_encoder.joblib',allow_pickle=True)
BROWSER_FAMILY_ENCODER_LAYER_3 = LabelEncoder()
BROWSER_FAMILY_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/browser_family_label_encoder.joblib',allow_pickle=True)
BROWSER_VERSION_ENCODER_LAYER_3 = LabelEncoder()
BROWSER_VERSION_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/browser_version_label_encoder.joblib',allow_pickle=True)
OS_FAMILY_ENCODER_LAYER_3 = LabelEncoder()
OS_FAMILY_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/os_family_label_encoder.joblib',allow_pickle=True)
OS_VERSION_ENCODER_LAYER_3 = LabelEncoder()
OS_VERSION_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/os_version_label_encoder.joblib',allow_pickle=True)
DEVICE_FAMILY_ENCODER_LAYER_3 = LabelEncoder()
DEVICE_FAMILY_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/device_family_label_encoder.joblib',allow_pickle=True)
PROBLEM_TYPE_ENCODER_LAYER_3 = LabelEncoder()
PROBLEM_TYPE_ENCODER_LAYER_3.classes_ = np.load('../model/Level_3/problem_solved_label_encoder.joblib',allow_pickle=True)
def model_inference_layer_3(time_taken,mouse_distance,country,state,is_proxy,is_abuser,user_agent,problem_type):
    country = COUNTRY_ENCODER_LAYER_3.transform([country])[0]
    state = STATE_ENCODER_LAYER_3.transform([state])[0]
    is_proxy = PROXY_ENCODER_LAYER_3.transform([is_proxy])[0]
    is_abuser = 1 if is_abuser else 0
    ua = parse_user_agent(user_agent)
    browser_family = BROWSER_FAMILY_ENCODER_LAYER_3.transform([ua['browser_family']])[0]
    browser_version = BROWSER_VERSION_ENCODER_LAYER_3.transform([ua['browser_version']])[0]
    os_family = OS_FAMILY_ENCODER_LAYER_3.transform([ua['os_family']])[0]
    os_version = OS_VERSION_ENCODER_LAYER_3.transform([ua['os_version']])[0]
    device_family = DEVICE_FAMILY_ENCODER_LAYER_3.transform([ua['device_family']])[0]
    is_mobile = 1 if ua['is_mobile'] else 0
    is_tablet = 1 if ua['is_tablet'] else 0
    is_pc = 1 if ua['is_pc'] else 0
    problem_type = PROBLEM_TYPE_ENCODER_LAYER_3.transform([problem_type])[0]
    data=np.array([is_abuser,time_taken,mouse_distance,state,country,problem_type,browser_family,browser_version,os_family,os_version,device_family,is_mobile,is_tablet,is_pc]).reshape(1,14)
    lgbm_pred = LGBM_MODEL_LAYER_3.predict_proba(data)
    xgb_pred = XGB_MODEL_LAYER_3.predict_proba(data)
    cat_pred = CAT_MODEL_LAYER_3.predict_proba(data)
    gate_data = np.array([xgb_pred[0][0],cat_pred[0][0],lgbm_pred[0][0]]).reshape(1,3)
    gate_pred = GATE_MODEL_LAYER_3.predict(gate_data)
    return gate_pred[0][0]
## bot
print(model_inference_layer_3(4.539,1696.625807,'India','Haryana','false',False,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36','ordering'))
## human
print(model_inference_layer_3(3.193,2125.782825,'India','Delhi','false',False,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','match'))
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = F.relu(x)
        x = self.conv2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        output = F.log_softmax(x, dim=1)
        return output
DATA_LOADER = torch.utils.data.DataLoader(datasets.MNIST('../model/', train=False, transform=transforms.Compose([transforms.ToTensor(),transforms.Normalize((0.1307,), (0.3081,)),])),batch_size=1, shuffle=True)
LENET_MODEL = Net()
LENET_MODEL.load_state_dict(torch.load('../model/lenet_mnist_model.pth.pt', weights_only=False, map_location=torch.device('cpu')))
LENET_MODEL.eval()
def fgsm_attack(image, epsilon, data_grad):
    sign_data_grad = data_grad.sign()
    perturbed_image = image + epsilon*sign_data_grad
    perturbed_image = torch.clamp(perturbed_image, 0, 1)
    return perturbed_image
def get_image(): # returns a random image from the MNIST dataset
    data, target = next(iter(DATA_LOADER))
    return data[0].numpy(), target[0].item()
def denorm(batch, mean=[0.1307], std=[0.3081]):
    if isinstance(mean, list):
        mean = torch.tensor(mean)
    if isinstance(std, list):
        std = torch.tensor(std)

    return batch * std.view(1, -1, 1, 1) + mean.view(1, -1, 1, 1)

def get_adv_image(epsilon):
    image,image_label=get_image()
    image = torch.tensor(image).unsqueeze(0)
    image.requires_grad = True
    output = LENET_MODEL(image)
    loss = F.nll_loss(output, torch.tensor([image_label]))
    LENET_MODEL.zero_grad()
    loss.backward()
    data_grad = image.grad.data
    data_denorm = denorm(image)
    perturbed_image = fgsm_attack(data_denorm, epsilon, data_grad)
    perturbed_image = transforms.Normalize((0.1307,), (0.3081,))(perturbed_image)
    perturbed_image=perturbed_image.squeeze(0).detach().numpy()
    return perturbed_image.tolist(), image_label