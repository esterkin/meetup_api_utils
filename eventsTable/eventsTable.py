import time 
import json
import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

location = sys.argv[1]
radius = sys.argv[2]
pages = int(sys.argv[3])

chrome_options = Options()
chrome_options.add_argument("--allow-file-access-from-files")
driver = webdriver.Chrome("./chromedriver",chrome_options=chrome_options)
driver.get("https://www.meetup.com/find/events/?allMeetups=true&radius=" + radius + "&userFreeform=" + location)

# click 'Show More' once to enable infinite scrolling
driver.find_element_by_css_selector('div.simple-infinite-pager > span.button').click()

time.sleep(0.5)

for i in range(pages):
	driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
	time.sleep(0.5)

# convert events on page into json
script = open("./getEvents.js").read()
result = driver.execute_script(script + 'return results;')

# write json to file
results = open("events.json", "w")
results.write(result.encode('utf-8').strip())
results.close()

# open events table 
print(os.getcwd())
driver.get("File://" + os.getcwd() + "/index.html")

