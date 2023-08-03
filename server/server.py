from flask import Flask, request, jsonify
from scraper.scraper import scrapeBigThink
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Hello, World!"

@app.route("/scrape", methods=["GET", "POST"])
def scrape():    
    #receive the json url from the frontend
    data = request.get_json()
    # Check if 'url' is in data before accessing it
    if 'url' not in data:
        return jsonify({ 'Response': 'No URL provided!' })

    url = data['url']
    #scrape the url
    scrapedData = scrapeBigThink(url)
    #return the scraped data
    scrapedDataJSON = jsonify({ 'Response': 'Received the URL!',
                     'url': url,
                      'scrapedData': scrapedData })

    if scrapedData: return scrapedDataJSON
    else: return jsonify({ 'Response': 'Failed to receive the URL!' })

if __name__ == '__main__':
    app.run(debug=True, port=8000)