from sys import argv
from time import sleep
from random import random, randrange
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

def main():
    useMouse = len(argv) > 1

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--start-maximized")
    chrome_service = Service('./chromedriver')
    driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    actions = ActionChains(driver)

    while True:
        driver.get('https://sih-ui-xi.vercel.app/')

        if useMouse:
            mouse_offset_x = randrange(-300, 300)
            mouse_offset_y = randrange(-150, 150)
            html_root = driver.find_element(By.TAG_NAME, 'html')
            actions.move_to_element_with_offset(html_root, mouse_offset_x, mouse_offset_y).perform()

        sleep(random() * 2 + 1)

        aadhar_input = driver.find_element(By.CLASS_NAME, 'place')
        if useMouse:
            actions.click(aadhar_input).perform()
        for i in range(randrange(7, 14)):
            aadhar_input.send_keys(randrange(0, 10))
            sleep(randrange(0, 4) // 2)

        verify_button = driver.find_element(By.CLASS_NAME, 'submit-button')
        if useMouse:
            offset_x = randrange(-30, 30)
            offset_y = randrange(-10, 10)
            actions.move_to_element_with_offset(verify_button, offset_x, offset_y).click().perform()
        else:
            verify_button.click()

        sleep(random() * 3 + 3)

    driver.close()
    driver.quit()

if __name__ == '__main__':
    main()
