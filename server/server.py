from flask import Flask, request, jsonify, Response
from scraper.scraper import scrapeBigThink
from scraper.submit import insertData


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

@app.route("/submitEntry", methods=["POST"])
def submitEntry():    
    # Receive the json data from the frontend
    data = request.get_json()
    # Check if 'data' is in the received JSON before accessing it
    if 'text' not in data:
        return Response("No data provided!", status=400)  # 400 Bad Request
    # insertData(data['text'])
    insertData(data)
    return Response(status=204)  # 204 Success


if __name__ == '__main__':
    app.run(debug=True, port=5000)