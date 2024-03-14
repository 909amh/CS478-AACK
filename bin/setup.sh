#!/bin/bash

# install virtualenv
python3 -m pip install virtualenv
# python3 -m virtualenv -p python3.9.13 venv

# Checks machine
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Linux Machine"
    source "venv/bin/activate"
elif [[ "$OSTYPE" ==  "darwin"* ]]; then
    echo "Mac Machine"
    source "venv/bin/activate"
elif [[ "$OSTYPE" == "msys" ]]; then
    echo "Windows Machine"
    pip3 install virtualenv
    virtualenv -p python3.9.13 venv
    source "venv/Scripts/activate"
fi

pip3 install -r requirements.txt

deactivate