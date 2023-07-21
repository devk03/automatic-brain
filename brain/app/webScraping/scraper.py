from bs4 import BeautifulSoup 
import requests 
from langchain.llms import OpenAI

def scrape(url): 
    print("Scraping URL: " + url) 
    response = requests.get(url) 
    soup = BeautifulSoup(response.content, 'html.parser') 
    return bigThink(soup)

def bigThink(soup): 
    llm = OpenAI(temperature=0.9)
    paragraphs = soup.find_all('p', class_="") 
    passage = ""
    for paragraph in paragraphs:
        passage += paragraph.text
    response = str(llm.predict(f"""Read this article:{passage}, 
                               then write an bulleted outline of all the main points (write 3-4 sentences about each point) in the article with no indents: and
                               make it this format:
                               "
                                ***[point 1 + sentences about point 1]
                                ***[point 2 + sentences about point 2]
                               ...
                                ***[point n + sentences about point N]
                               "
                               where it goes up to however many points there are in the article. Also atleast produce 7 points.
                               """))
    print(response)
    return response






