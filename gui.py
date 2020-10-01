import subprocess
import asyncio
import sys
import os
from core.events import log
log.event(__name__, "\t", "Init..")


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# GUI
async def gui():
    log.event(__name__, "\t", "LOAD GUI..")
    import webview
    webview.create_window('PortHole', 'http://localhost:5000')
    webview.start()
