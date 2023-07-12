from bs4 import BeautifulSoup
import requests

def scrape(url):
    print("Scraping URL: " + url)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    print(soup.prettify())

