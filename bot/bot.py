from sys import argv
from time import sleep
from argparse import ArgumentParser, BooleanOptionalAction
from random import random, randrange
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

parser = ArgumentParser()
parser.add_argument('--mouse', action=BooleanOptionalAction)
parser.add_argument('--iterations', type=int)
parser.add_argument('--chrome')
parser.add_argument('--chromedriver')
parser.add_argument('--frontend')
args = parser.parse_args()

def get_element(driver, css_selector, all=False):
    wait = WebDriverWait(driver, 10)
    if all:
        return wait.until(expected_conditions.presence_of_all_elements_located((By.CSS_SELECTOR, css_selector)))
    return wait.until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, css_selector)))

def random_sleep(low, high):
    sleep(random() * (high - low) + low)

def random_click(actions, low_x, low_y, high_x, high_y, ref_element):
    if args.mouse:
        mouse_offset_x = randrange(low_x, high_x)
        mouse_offset_y = randrange(low_y, high_y)
        actions.move_to_element_with_offset(ref_element, mouse_offset_x, mouse_offset_y).click().perform()
    else:
        actions.click(ref_element).perform()

def home_page(driver, actions):
    random_click(actions, -10, -5, 10, 5, get_element(driver, "a[class*='userLoginBtn']"))

def aadhar_entry(driver, actions):
    random_click(actions, -10, -5, 10, 5, get_element(driver, "input[class*='aadharInp']"))
    for _ in range(randrange(10, 14)):
        actions.send_keys(randrange(0, 10)).perform()
        random_sleep(0, 1)
    random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='submitBtn']"))

def numeric_captcha(driver, actions):
    while random() < 0.50:
        # Incorrect
        for _ in range(3):
            r = randrange(1, 11)
            r = 11 if r == 10 else r
            random_click(actions, -10, -5, 10, 5, get_element(driver, f"button[class*='numberBtn']:nth-of-type({r})"))
        random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='numberBtn']:nth-of-type(12)"))

    # Correct
    random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='numberBtn']:nth-of-type(4)"))
    random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='numberBtn']:nth-of-type(7)"))
    random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='numberBtn']:nth-of-type(8)"))
    random_click(actions, -10, -5, 10, 5, get_element(driver, "button[class*='numberBtn']:nth-of-type(12)"))

def solve_task(driver, actions):
    caption = get_element(driver, "p[class*='instructionText']").get_attribute('innerText')
    if 'order' in caption:
        buttons = {}
        for r in range(1, 9):
            b = get_element(driver, f"button:nth-of-type({r})").get_attribute('innerText')
            buttons[int(b)] = r
        for r in range(1, 9):
            random_click(actions, -5, -5, 5, 5, get_element(driver, f"button:nth-of-type({buttons[r]})"))
    elif 'white' in caption:
        for b in get_element(driver, "button[class*='onTileDiv']", all=True):
            random_click(actions, -5, -5, 5, 5, b)
    else:
        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='leftDiv'] button[class*='squareDiv']"))
        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='rightDiv'] button[class*='squareDiv']"))

        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='leftDiv'] button[class*='circleDiv']"))
        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='rightDiv'] button[class*='circleDiv']"))

        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='leftDiv'] button[class*='starDiv']"))
        random_click(actions, -5, -5, 5, 5, get_element(driver, "div[class*='rightDiv'] button[class*='starDiv']"))

def return_home(driver, actions):
    random_click(actions, -5, -5, 5, 5, get_element(driver, "a[class*='returnLink']"))

def main():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = args.chrome
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--start-maximized")
    chrome_service = Service(args.chromedriver)
    
    driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    driver.get(args.frontend)

    actions = ActionChains(driver)

    for _ in range(args.iterations):
        random_sleep(1, 3)
        home_page(driver, actions)
        
        random_sleep(1, 3)
        aadhar_entry(driver, actions)
        
        random_sleep(1, 3)
        numeric_captcha(driver, actions)
        
        random_sleep(1, 3)
        solve_task(driver, actions)
        
        random_sleep(1, 3)
        return_home(driver, actions)

    driver.close()
    driver.quit()

if __name__ == '__main__':
    main()
