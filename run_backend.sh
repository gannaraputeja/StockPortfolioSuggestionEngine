#!/bin/bash

cd backend

# Create virtual environment
python3 -m venv venv


# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# set api key
export PORT=8000
export STOCK_API_URL=https://api.iex.cloud
export STOCK_API_KEY=

# Run Flask app
flask run --host 0.0.0.0 --port 8000 --debugger

# deactivate
deactivate
