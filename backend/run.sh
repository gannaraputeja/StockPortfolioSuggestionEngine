#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Run Flask app
flask run --host 0.0.0.0 --port 8000 --debugger

