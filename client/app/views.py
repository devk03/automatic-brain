from app import app
from flask import render_template
from flask import request
from app.webScraping.scraper import scrape

sys.path.append('/Users/devk/Documents/automatic-brain/server')


@app.route('/')
def hello_world_another():  # Changed function name
    return render_template('scraper.html')  # Changed return value

@app.route('/scrape', methods=['POST'])
def handle_form_submission():
    url = request.form.get('url') # get the URL from the submitted form data
    print("Scraping URL: " + url)
    outline = scrape(url) # call the scrape function with the URL
    html = render_template("results.html", points=outline)
    return html # pass the list to the template

@app.route('/sendNoteToDB', methods=['POST']){
    # send the outline to the database

}

