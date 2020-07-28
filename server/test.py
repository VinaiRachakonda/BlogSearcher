import requests
import openai
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from bs4 import BeautifulSoup
import feedparser
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


documents = []
links = []
headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
}

openai.api_key = "INSERT OPEN AI KEY"


@app.route('/', methods=['GET'])
def hello():
    return 'this is the blog searcher app'

# Ingests an rss link. Takes the first 100 posts. Stores each post into a document truncated by 8000 characters.
@app.route('/ingest', methods=['POST'])
def ingest():
    url = request.json['rss_url']
    rss = feedparser.parse(url)

    entries = rss.entries[0:50]  # grab the first 50 entries

    for entry in entries:
        link = entry.link
        req = requests.get(link, headers)
        soup = BeautifulSoup(req.content, 'html.parser')

        documents.append(soup.get_text()[0:5000])
        links.append(link)

    return jsonify({'status': 'ok'})

@app.route('/search', methods=['POST'])
def search():
    query = request.json['query']


    response = openai.Engine("davinci").search(
        documents=documents,
        query=query
    )
    response = sorted(response.data, key = lambda i: i['score'], reverse = True)
    top3 = [links[response[0].document], links[response[1].document], links[response[2].document]]
    return jsonify({'data': top3})



if __name__ == '__main__':
    os.environ['FLASK_ENV'] = 'development'
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
