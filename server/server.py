from flask import Flask, request, jsonify, Response
from scraper.scraper import scrapeBigThink
from scraper.submit import insertData
from graph.pullData import queryData
from gptKey import OPENAI_API_KEY, SUPABASE_URL, SUPABASE_KEY
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
    scrapedData = scrapeBigThink(url, OPENAI_API_KEY)
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
    print(data)
    if 'text' not in data:
        return Response("No data provided!", status=400)  # 400 Bad Request
    # insertData(data['text'])
    insertData(data, SUPABASE_URL, SUPABASE_KEY)
    return Response(status=204)  # 204 Success

@app.route("/get-graph", methods=['GET'])
def get_data():
    data = queryData(SUPABASE_URL, SUPABASE_KEY)
    print("monkey", type(data))
    json_data = data.json()
    return jsonify(json_data)
if __name__ == '__main__':
    app.run(debug=True, port=5000)