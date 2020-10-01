
"""
Front-end engine.
"""

import os
import sys
import time
import logging
import subprocess
import webview
from termcolor import colored
from quart import Quart, websocket, render_template

logger = logging.getLogger(__name__)
print(colored('::init package..', 'white'))

proc = subprocess.Popen('python3 porthole/engine.py', shell=True)

# create window
time.sleep(2)
try:
    webview.create_window('ERP', 'http://localhost:5000')
    webview.start(gui='qt', debug=True)
except Exception as e:
    print(e)
