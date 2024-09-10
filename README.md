<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div>
 
<h1 align="center">DCAPTCHA</h1>

     
## Team Details

**Team Name:** MINI-DORAS

**Problem ID:** 1672

**Team Leader:** Naman Bansal [@Nb4159](https://github.com/Nb4159)

**Team Members:**

- **MEMBER_1** - 2022UIN3312 Naman Bansal - [@Nb4159](https://github.com/Nb4159)
- **MEMBER_2** - 2022UIN3341 Arunima Banerjee- [@elisedare28](https://github.com/elisedare28)
- **MEMBER_3** - 2022UIN3371 Hemant Kumar- [@HemantKr071](https://github.com/HemantKr071)
- **MEMBER_4** - 2022UIN3356 Pranav Varshney- [@pranav2310](https://github.com/pranav2310)
- **MEMBER_5** - 2022UIN3339 Prasann- [@Prasann2004](https://github.com/Prasann2004)
- **MEMBER_6** - 2022UIN3330 Ritobroto Mukherjee- [@RMZeroFour](https://github.com/RMZeroFour)

    <br />
</div>

## Project Links

- **Final SIH Presentation:** [Final SIH Presentation](https://github.com/RMZeroFour/DCAPTCHA/blob/main/files/SIH%202024%20Presentation.pdf)
- **Video Demonstration:** [Watch Video](https://youtu.be/uagNPOD-J6c)
- **Source Code:** [GitHub Repository](https://github.com/RMZeroFour/DCAPTCHA)


<!-- TABLE OF CONTENTS -->
## Table of Contents
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
The Unique Identification Authority of India (UIDAI) manages crucial Aadhaar-related operations and uses CAPTCHA to protect its portals, but it has drawbacks. CAPTCHA can be time-consuming and frustrating for users and poses accessibility challenges for people with disabilities.

This solution must follow strict privacy policies, collecting minimal, anonymized data and ensuring compliance with legal and ethical standards.

The Solution follows a 3 Layer approach:

- **Layer 1(ML Judge):** Uses a ML model to classify the user as a bot or Human. If the model has low Confidence it will move to layer 2.
- **Layer 2(Simple Task + Sus Meter):** Displays 9 problems and an image of number displaying which problem to solve. This image would be generated using SOTA addversal attack methods making it very difficult for the bot to identify the image. If the bot is still able to solve the problem there will be a model known as Sus Meter that will help us identifying if the bot has solved the problem.
The problems will be chosen which can be solved by majority indians deduced by a Survey.
- **Layer 3(Normal Captcha):** If the model is still unsure we will just use Normal Captcha.


### Built With


* React - [react.dev](https://react.dev/)
* Vite JS - [vitejs.dev](https://vitejs.dev/)
* PyTorch - [pytorch.org](https://pytorch.org/)
* FastAPI - [fastapi.tiangolo.com](https://fastapi.tiangolo.com/)
* TensorFlow - [tensorflow.org](https://www.tensorflow.org/)
* CatBoost - [catboost.ai](https://catboost.ai/)
* XGBoost - [xgboost.readthedocs.io](https://xgboost.readthedocs.io/en/latest/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This project requires the following npm packages:

#### Backend

- **[fastapi](https://fastapi.tiangolo.com/)**: For creating amd using the apis.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: For managing environment variables.

#### Frontend

- **[react](https://www.npmjs.com/package/react)**: Frontend library for building user interfaces.
- **[react-dom](https://www.npmjs.com/package/react-dom)**: For DOM-related rendering.
- **[CSS]**: For styling web pages.
- **[vite](https://www.npmjs.com/package/vite)**: Build tool for faster development.


### Installation

#### Clone the Repository

   ```sh
   git clone https://github.com/RMZeroFour/DCAPTCHA/tree/main
   ```

#### Set up Backend

1. Navigate to the back directory

  ```sh
    cd back
  ```
2. Install requirements

 ```sh
  pip install -r requirements.txt 
  ```
3. Run Backend

 ```sh
  python main.py 
  ```
#### Run Frontend

1. Navigate to the vite-project folder in the front directory 
  ``` cd front
      cd vite-project
  ```
2. Run the website
  ``` npm run dev ```

#### To run the BOT

1. Navigate to the bot directory

 ```sh
  cd bot
  ```
2. Install required dependencies
 ```sh
  pip install -r requirements 
  ```
3. Run bot script
 ```sh
  python bot.py 
  ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


