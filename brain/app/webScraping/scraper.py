from bs4 import BeautifulSoup 
import requests 
from langchain.llms import OpenAI 
passage = ""
def scrape(url): 
    llm = OpenAI(temperature=0.9) 
    print("Scraping URL: " + url) 
    response = requests.get(url) 
    soup = BeautifulSoup(response.content, 'html.parser') 
    bigThink(soup) # call the function tree for bigThink.com 
def bigThink(soup): 
    paragraphs = soup.find_all('p', class_="") 
    for paragraph in paragraphs: 
        print(paragraph.text) 
        passage += paragraph.text #next step is to add this to the prompt passed to gpt api as a langchain parameter