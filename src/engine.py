
"""
Front-end engine.
"""

import os
import sys
import glob
import logging
import threading
import webview
from termcolor import colored
from quart import Quart, websocket, render_template
from utilities.stackapi.backend.base import StackAPI


LOGGER = logging.getLogger(__name__)
print(colored('core.tasks::\tinit package..', 'white'))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


###########################
######      API      ######
###########################

print(colored('::build BACKEND API..', 'white'))
BACKEND = StackAPI.new(label='BACKEND', mode='websocket')

@BACKEND.rpc('load_hosts')
async def load_hosts():
    """Retreive hosts list from configuration files."""
    print(colored('StackAPI::\tLoad hosts..', 'magenta'))
    # reset list
    host_list = []
    # for config files in hosts
    for file in glob.glob("config/hosts/*.cfg"):
        # build host object
        config = configparser.ConfigParser()
        try:
            config.read(file)
        except:
            print(colored('core.tasks::\tError reading config file!', 'red'))
        host = {
            "label": config['HOST']['Label'],
            "hostname": config['HOST']['Hostname'],
            "domain": config['HOST']['Domain'],
            "web_panel_url": config['HOST']['WebPanelURL']
        }
        # add host to list
        host_list.append(host)
    return json.dumps(host)


###########################
######    BACKEND    ######
###########################

print(colored('::build app..', 'white'))
app = Quart(__name__)


@app.route('/')
async def home():
    """Main view route."""
    test = {'test': 'test'}
    return await render_template('frame.html', title='Home', test=test)

@app.errorhandler(404)
async def not_found(error):
    """View not found route."""
    return await render_template('404.html'), 404

@app.websocket('/ws')
async def dispatch():
    """Websocket route."""
    #create coroutines for queue and socket
    await BACKEND.handle_websocket(websocket)


@app.websocket('/api/config/read/host/<string:domain>/<string:section>/<string:param>/')
async def read_host_param(domain, section, param):
    """Host parameter read method route."""
    print(colored('StackAPI::\tGET param..', 'magenta'))
    # read param
    config = configparser.ConfigParser()
    config.read("config/hosts/"+domain+".cfg")
    param = config[section][param]
    # return host list
    print(colored(f'StackAPI::\tReturn <{param}>.', 'magenta'))
    return json.dumps(param)


print(colored('run app..', 'white'))
app.run(address='0.0.0.0:5000', follow_symlinks=True, debug=True)
