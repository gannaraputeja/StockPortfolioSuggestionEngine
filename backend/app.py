import os
import requests
import json
import logging
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

logger = logging.getLogger(__name__)

# URL for stock API IEX Cloud
STOCK_API_URL = os.getenv('STOCK_API_URL')
# API KEY for IEX Cloud
STOCK_API_KEY = os.getenv('STOCK_API_KEY')

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

""" Stocks for investment strategies"""

# The stocks are ordered in the best stock first
# As per the team decision we decided to spread the amount into 3 different parts
# 1st stock gets 50% of amount to be invested
# 2nd stock gets 30% of amount to be invested
# 3rd stock gets 20% of amount to be invested
investment_strategies = {
    "Ethical Investing": ["AAPL", "TSLA", "ADBE"],
    "Quality Investing": ["NVDA", "MU", "CSCO"],
    "Index Investing": ["VOO", "VTI", "ILTB"],
    "Value Investing": ["INTC", "BABA", "GE"],
    "Growth Investing": ["OXLC", "ECC", "AMD"],
}


def get_stock_quote(ticker_list):
    """
        Fetches stock details for each ticker using the stock API.
    """
    url_base = f"{STOCK_API_URL}/v1/data/core/quote"
    filter_keys = "symbol,companyName,latestPrice,latestTime,change,changePercent"

    stock_details = []
    for ticker in ticker_list:
        url = f"{url_base}/{ticker}?token={STOCK_API_KEY}&filter={filter_keys}"
        response = requests.get(url)

        if response.status_code == 200:
            stock_details.append(response.json())

    return stock_details


@app.route('/hello', methods=['GET'])
def hello_world():
    print("hello world")
    return "Hello World"


@app.route('/suggestions', methods=['POST'])
@cross_origin(origin='*')
def fetch_suggestions():
    strategies = request.json.get("Strategies")
    amount = request.json.get("Amount")

    strategies_response = {}
    response_amount = [amount * 0.5, amount * 0.3, amount * 0.2]
    piechart_response = []

    logger.info("Strategies: %s", strategies)
    for strategy in strategies:
        logger.info("Strategy: %s", strategy)
        strategies_response[strategy] = get_stock_quote(investment_strategies[strategy])
        for i, stock in enumerate(investment_strategies[strategy]):
            piechart_response.append({"title": stock, "value": response_amount[i]})

    response_details = {"strategiesResponse": strategies_response, "amountResponse": response_amount,
                        "piechartResponse": piechart_response}
    response = Response(json.dumps(response_details), mimetype='application/json')
    logger.info("Response: %s", response)
    return response


@app.route('/charts/<symbol>', methods=['GET'])
@cross_origin(origin='*')
def get_charts(symbol):
    url_base = f"{STOCK_API_URL}/v1/stock/{symbol}/chart/1m?token={STOCK_API_KEY}"
    response = requests.get(url_base)
    return response.json()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=000)
