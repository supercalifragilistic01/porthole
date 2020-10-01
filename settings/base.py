import os
from termcolor import colored


# Build paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print('BASE_DIR: '+BASE_DIR)

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
print('PROJECT_ROOT: '+PROJECT_ROOT)

LOGS_DIR = BASE_DIR+"/logs/"
print('LOGS_DIR: '+LOGS_DIR)
