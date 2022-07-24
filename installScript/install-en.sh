#!/bin/bash
# This script installs all the required components and libaries needed for the EASYGREENHOUSE project by Easy Tec.
# This script must be executed only once!
# On easytec.tech/xxx you can find a manual in German and English.
# This script is in beta version. This script has been tested, but we do not assume any liability when using the script. 
# Please run this script on a newly installed instance on a Raspberry Pi 3b+ (no guarantee, might work on other models as well). 
#

# Version 1.0.0
# Version BETA

# Variables

# colors
#NORMAL='\033[39m'
BLUE='\033[34m'
GREEN='\033[1;32m'
RED='\033[1;31m'
ORANGE='\033[1;33m'


# Detect ctrl+C
trap CtrlC INT

# Function for trap
CtrlC() {
  echo ""$ORANGE""
  read -p "Are you sure you want to quit the script? [y/n] " reply
    if [ "$reply" == "y" ];
    then
    exit 0
    else
    echo ""$ORANGE"Okay, go ahead."
    fi
}


# DO NOT AJUST! - Script begin #

# Welcome
echo ""$GREEN"Welcome! With this script from Easy Tec you install the software for the EASYGREENHOUSE on your Raspberry Pi."
echo ""$ORANGE"With this action you agree to the license."
read -p "Do you want to continue? (y/n)" query_continue

if [ "$query_continue" = n ];
  then
  echo ""$RED"Okay, you have not accepted the license. Cancel.."
  exit 0
  else
  echo "Okay, go ahead.."
fi

#Queries

# Abfrage1 (z.B. sowas wie Passwort oder so - kann er selber anlegen..)
#read -p "Please enter your external domain for the website (or IP address for -exclusively- internal accesses): " Abfrage1
#read -p "Statement correct? (y/n): $Abfrage1 " Abfrage1_1
#if [ "$Abfrage1_1" == "n" ];
#  then
#    read -p "Please enter your external domain for the website (or IP address for -exclusively- internal accesses): " Abfrage2
#    read -p "Statement correct? (y/n): $Abfrage2 " Abfrage2_2
#    if [ "$Abfrage2_2" == "n" ];
#      then
#        echo ""$RED"Too many misstakes. Please run the script again. Abort.."
#        exit 0
#    else
#        echo ""$GREEN"Okay, go ahead.."
#    fi
#  else
#    echo ""$GREEN"Okay, go ahead.."
#fi


# Script (From here, all the necessary parts are installed.)

# install
echo ""$BLUE"Install required parts.."
echo ""$BLUE"This may take a few minutes.."

# update system
echo ""$BLUE"Update system.."
sudo apt-get update
sudo apt-get upgrade -y

# install Modules - general
echo ""$BLUE"Install general modules.."
sudo apt-get install python3-pip -y
sudo apt-get install build-essential python-dev git
pip3 install subprocess
pip3 install ping3
pip3 install discord-webhook



# install Modules - Soil moisture sensor
echo ""$BLUE"Install modules for soil moisture sensor.."
pip3 install smbus
git clone https://github.com/adafruit/Adafruit_Python_ADS1x15
cd Adafruit_Python_ADS1x15 && sudo python3 setup.py install


# install Modules - Temperature and Humidity sensor
echo ""$BLUE"Install modules for Temperature and Humidity sensor.."
sudo python3 -m pip install --upgrade pip setuptools wheel
sudo pip3 install Adafruit_DHT


# install Modules - soilTemperature sensor
echo ""$BLUE"Install modules for soil Temperature sensor.."
echo ""$BLUE"enable 1-Wire.."
sed -i -e '$a2 dtoverlay=w1-gpio' /boot/config.txt
echo ""$BLUE"set up certain functions.."
sudo modprobe w1-gpio
sudo modprobe w1-therm


# install Modules - ventilation (cooling)
echo ""$BLUE"Install modules for ventilation (cooling).."
sudo apt-get install libusb-dev
gcc -o hub-ctrl hub-ctrl.c -lusb


# install database
echo ""$BLUE"install database.."
sudo apt install mariadb-server
pip3 install mariadb

echo ""$BLUE"start setup.."
sudo mysql_secure_installation


# clone GitHub Repository
echo ""$BLUE"Clones easygreenhouse repository.."
git clone https://github.com/JonesMCL/easygreenhouse.git

# End
echo ""$GREEN"Script was installed successfully."
echo ""$BLUE"Your version of the website: v x.x.x"
echo ""$BLUE"If a newer version is available, you can update your website at any time using the update script."
echo ""$BLUE"Learn more about the update script by checking out this project on GitHub."

# Query
read -p "To complete this installation, the Raspberry Pi must be restarted. Reboot now? (y/n) " rebootNow
if [ "$rebootNow" = y ];
  then
  echo ""$ORANGE"Script end. Restart in progress.."
  sudo reboot
  else
    echo ""$ORANGE"Cancelled. Please restart the Raspberry Pi soon so that the easygreenhouse can run without problems."
    echo ""$ORANGE"You can reboot with this command: sudo reboot"
    echo ""$ORANGE"Script end."
fi



