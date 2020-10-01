
"""
Front-end engine.
"""

import os
import sys
import logging
import threading
import webview
from termcolor import colored
from quart import Quart, websocket, render_template
from stackapi import StackAPI


logger = logging.getLogger(__name__)
print(colored('core.tasks::\tinit package..', 'white'))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


###########################
######      API      ######
###########################

print(colored('::build backend API..', 'white'))
backend = StackAPI.new(label='backend', mode='websocket')

@backend.rpc('load_hosts')
async def load_hosts():
    console.log("Load hosts..")
    # reset list
    host_list = []
    # for config files in hosts
    files = glob.glob("config/hosts/*.cfg")
    log.event(__name__, "\t", "Found "+str(len(files))+" host files.")
    for entry in files:
        # build host object
        config = configparser.ConfigParser()
        try:
            config.read(entry)
        except:
            log.error(__name__, "\t", "Error reading config file!")
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
    test = {'test': 'test'}
    return await render_template('frame.html', title='Home', test=test)

@app.errorhandler(404)
async def not_found(error):
    return await render_template('404.html'), 404

@app.route('/profile/<string:profile>/')
async def profile(profile):
    return await render_template('profile.html', profile=profile)


@app.websocket('/ws')
async def dispatch():
    #create coroutines for queue and socket
    await backend.handle_websocket(websocket)


@app.websocket('/api/load_sites/')
async def load_sites():
    console.log("Load sites..")
    # reset list
    host_list = []
    # for config files in hosts
    files = glob.glob("config/sites/*.cfg")
    log.event(__name__, "\t", "Found "+str(len(files))+" site files.")
    for entry in files:
        # build host object
        config = configparser.ConfigParser()
        try:
            config.read(entry)
        except:
            log.error(__name__, "\t", "Error reading config file!")
        host = {
          "server_name": config['SITE']['ServerName'],
          "hostname": config['HOST']['Hostname'],
          "domain": config['HOST']['Domain']
        }
        # add host to list
        site_list.append(site)
    # return host list
    await websocket.send( json.dumps(site_list) )
    #no more file
    console.log(f'End of files.')
    await websocket.send('<EOS>')
    await websocket.close()

@app.websocket('/api/config/read/host/<string:domain>/<string:section>/<string:param>/')
async def read_host_param(domain, section, param):
    console.log(__name__, "\t", "GET param..")
    # read param
    config = configparser.ConfigParser()
    config.read("config/hosts/"+domain+".cfg")
    param = config[section][param]
    # return host list
    console.log(__name__, "\t", "Return <"+param+">.")
    return json.dumps(param)

@app.websocket('/api/config/read/site/<string:domain>/<string:section>/<string:param>/')
def read_site_param(domain, section, param):
        log.event(__name__, "\t", "GET param..")
        # read param
        config = configparser.ConfigParser()
        config.read("config/sites/"+domain+".cfg")
        param = config[section][param]
        # return site list
        log.event(__name__, "\t", "Return <"+param+">.")
        return json.dumps(param)


print(colored('run app..', 'white'))
app.run(address='0.0.0.0:5000', follow_symlinks=True, debug=True)
