#!/usr/bin/python3.6

#######################################
##          (w/ Python 3.6)          ##
#######################################

ssh_host = "51.68.212.124"
ssh_user = "root"
ssh_pass = "Voynich#15"

# DO NOT EDIT BELLOW THIS LINE


from glob import glob
import sys
import os


# SCRIPT
arg = str(sys.argv[1])
if arg:
    if(arg=="update"):
        print("uploading..")
        os.system("sudo rsync -rtvzL -e 'ssh -p 22' --progress --delete output/* "+ssh_user+"@"+ssh_host+":/var/tmp/website")


    elif(arg=="upgrade"):
        print("erasing..")
        os.system("sudo ssh "+ssh_user+"@"+ssh_host+" rm -rf /var/tmp/website/*")
        print("uploading..")
        os.system("sudo rsync -rtvzL -e 'ssh -p 22' --progress --delete output/* "+ssh_user+"@"+ssh_host+":/var/tmp/website")
