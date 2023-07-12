from app import app
from flask import render_template
from flask import request
from app.webScraping.scraper import scrape
@app.route('/')
def hello_world_another():  # Changed function name
    return render_template('scraper.html')  # Changed return value

@app.route('/scrape', methods=['POST'])
def handle_form_submission():
    url = request.form.get('url') # get the URL from the submitted form data
    print("Scraping URL: " + url)
    scrape(url) # call your scrape function with the URL
    return 'Success!' # return a response
