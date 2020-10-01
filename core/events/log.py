from termcolor import colored
from datetime import datetime, date
import inspect
import os, sys
import time
import csv

from settings import base


#set folders
EVENTS_DIR = base.LOGS_DIR+"events/"
ERRORS_DIR = base.LOGS_DIR+"errors/"


#tools
def __ensure_folder(path, permissions):
    print(colored("ensure <"+path+"> folder..", "grey"))
    if os.path.isdir(path):
        print(colored("folder exist!", "grey"))
    else:
        print(colored("folder doesn't exist, creating..", "grey"))
        os.mkdir(path, permissions);
        if os.path.isdir(path) == False:
            print(colored("logs folder creation failed!", "red"))
            sys.exit()


#no object relations, if needed get object by package._label.package_object like from web-gui object-call
def initialize():
    print(colored("initializ logs..", "grey"))
    __ensure_folder(settings.LOGS_DIR, 774)
    __ensure_folder(EVENTS_DIR, 774)
    __ensure_folder(ERRORS_DIR, 774)


def event(package, object="\t", details="", **extra_fields):
    print(colored(package+"\t"+object+"\t"+details, "green"))
    datestamp = date.today().isoformat()
    timestamp = datetime.now().time().isoformat()

    log_file = EVENTS_DIR+datestamp+".log"
    if os.path.isfile(log_file):
        mode = 'a+'
    else:
        mode = 'w+'
    with open(log_file, mode) as file:
        fieldnames = ['time', 'package', 'object', 'details']
        csv.register_dialect('default', delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL) #settings
        writer = csv.DictWriter(file, dialect='default', fieldnames=fieldnames) #settings
        if mode == 'w+':
            writer.writeheader()
        writer.writerow({'time': timestamp, 'package': package, 'object': object, 'details': details})


def error(package, object, exception, **extra_fields):
    print(__name__)
    print(colored(package+"\t"+object+"\t"+str(exception), "yellow"))
    datestamp = date.today().isoformat()
    timestamp = datetime.now().time().isoformat()
