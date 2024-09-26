from sys import argv
from time import sleep
from argparse import ArgumentParser, BooleanOptionalAction
from random import random, randrange
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

parser = ArgumentParser()
parser.add_argument('--mouse', action=BooleanOptionalAction)
parser.add_argument('--iterations', type=int)
parser.add_argument('--chrome')
parser.add_argument('--chromedriver')
parser.add_argument('--frontend')
args = parser.parse_args()

def random_sleep(low, high):
    sleep(random() * (high - low) + low)

def random_mouse_pos(actions, low_x, low_y, high_x, high_y, ref_element):
    if args.mouse:
        mouse_offset_x = randrange(low_x, high_x)
        mouse_offset_y = randrange(low_y, high_y)
        actions.move_to_element_with_offset(ref_element, mouse_offset_x, mouse_offset_y).perform()

def home_page(driver, actions):
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "a[class*='loginBtn']"))
    actions.click().perform()

def aadhar_entry(driver, actions):
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "input[class*='aadharInp']"))
    actions.click().perform()
    for _ in range(randrange(10, 14)):
        actions.send_keys(randrange(0, 10)).perform()
        random_sleep(0, 1)
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='submitBtn']"))
    actions.click().perform()

def numeric_captcha(driver, actions):
    while random() < 0.50:
        # Incorrect
        for _ in range(3):
            r = randrange(1, 11)
            r = 11 if r == 10 else r
            random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, f"button[class*='numberBtn']:nth-of-type({r})"))
            actions.click().perform()
        random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='numberBtn']:nth-of-type(12)"))
        actions.click().perform()

    # Correct
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='numberBtn']:nth-of-type(4)"))
    actions.click().perform()
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='numberBtn']:nth-of-type(7)"))
    actions.click().perform()
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='numberBtn']:nth-of-type(8)"))
    actions.click().perform()
    random_mouse_pos(actions, -10, -5, 10, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='numberBtn']:nth-of-type(12)"))
    actions.click().perform()

def solve_task(driver, actions):
    caption = driver.find_element(By.CSS_SELECTOR, "p[class*='instructionText']").get_attribute('innerText')
    if 'order' in caption:
        buttons = {}
        for r in range(1, 9):
            b = driver.find_element(By.CSS_SELECTOR, f"button:nth-of-type({r})").get_attribute('innerText')
            buttons[int(b)] = r
        for r in range(1, 9):
            random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, f"button:nth-of-type({buttons[r]})"))
            actions.click().perform()
    elif 'white' in caption:
        while True:
            try:
                random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "button[class*='onTileDiv']"))
                actions.click().perform()
            except NoSuchElementException:
                break
    else:
        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='leftDiv'] button[class*='squareDiv']"))
        actions.click().perform()
        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='rightDiv'] button[class*='squareDiv']"))
        actions.click().perform()

        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='leftDiv'] button[class*='circleDiv']"))
        actions.click().perform()
        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='rightDiv'] button[class*='circleDiv']"))
        actions.click().perform()

        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='leftDiv'] button[class*='starDiv']"))
        actions.click().perform()
        random_mouse_pos(actions, -5, -5, 5, 5, driver.find_element(By.CSS_SELECTOR, "div[class*='rightDiv'] button[class*='starDiv']"))
        actions.click().perform()

def main():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = args.chrome
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--start-maximized")

    chrome_service = Service(args.chromedriver)
    driver = webdriver.Chrome(service=chrome_service, options=chrome_options)

    actions = ActionChains(driver)

    for _ in range(args.iterations):
        driver.get(args.frontend)

        random_mouse_pos(actions, -300, -150, 300, 150, driver.find_element(By.TAG_NAME, 'html'))
        
        random_sleep(0, 2)
        home_page(driver, actions)
        
        random_sleep(1, 3)
        aadhar_entry(driver, actions)
        
        random_sleep(1, 3)
        numeric_captcha(driver, actions)
        
        random_sleep(1, 3)
        solve_task(driver, actions)
        
        random_sleep(3, 5)

    driver.close()
    driver.quit()

if __name__ == '__main__':
    main()
