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
DATA_LOADER = torch.utils.data.DataLoader(datasets.MNIST('D:\DCAPTCHA\model', train=False, transform=transforms.Compose([transforms.ToTensor(),transforms.Normalize((0.1307,), (0.3081,)),])),batch_size=1, shuffle=True)
LENET_MODEL = Net()
LENET_MODEL.load_state_dict(torch.load('D:\DCAPTCHA\model\lenet_mnist_model.pth.pt', weights_only=False, map_location=torch.device('cpu')))
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