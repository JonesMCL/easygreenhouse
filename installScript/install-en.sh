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
NORMAL='\033[39m'
BLUE='\033[34m'
GREEN='\033[1;32m'
RED='\033[1;31m'
ORANGE='\033[1;33m'


# Detect ctrl+C
trap CtrlC INT

# Function for trap
CtrlC() {
  echo -e ""$ORANGE""
  read -p "Are you sure you want to quit the script? [y/n] " reply
    if [ "$reply" == "y" ];
    then
    exit 0
    else
    echo -e ""$ORANGE"Okay, go ahead."
    fi
}


# DO NOT AJUST! - Script begin #

# Welcome
echo -e ""$GREEN"Welcome! With this script from Easy Tec you install the software for the EASYGREENHOUSE on your Raspberry Pi."
echo -e ""$ORANGE"With this action you agree to the license."
read -p "Do you want to continue? (y/n)" query_continue

if [ "$query_continue" = n ];
  then
  echo -e ""$RED"Okay, you have not accepted the license. Cancel.."
  exit 0
  else
  echo -e "Okay, go ahead.."
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
#        echo -e ""$RED"Too many misstakes. Please run the script again. Abort.."
#        exit 0
#    else
#        echo -e ""$GREEN"Okay, go ahead.."
#    fi
#  else
#    echo -e ""$GREEN"Okay, go ahead.."
#fi


# Script (From here, all the necessary parts are installed.)

# install
echo -e ""$BLUE"Install required parts.."
echo -e ""$BLUE"This may take a few minutes.."

# update system
echo -e ""$BLUE"Update system.."
sudo apt-get update
sudo apt-get upgrade -y

# install Modules - general
echo -e ""$BLUE"Install general modules.."
echo -e "$NORMAL"
sudo apt-get install python3-pip -y
sudo apt-get install build-essential python3-dev -y
pip3 install subprocess.run
pip3 install ping3
pip3 install discord-webhook



# install Modules - Soil moisture sensor
echo -e ""$BLUE"Install modules for soil moisture sensor.."
echo -e "$NORMAL"
pip3 install smbus
git clone https://github.com/adafruit/Adafruit_Python_ADS1x15
cd Adafruit_Python_ADS1x15 && sudo python3 setup.py install
cd .. # jump to previous path


# install Modules - Temperature and Humidity sensor
echo -e""$BLUE"Install modules for Temperature and Humidity sensor.."
echo -e "$NORMAL"
sudo python3 -m pip install --upgrade pip setuptools wheel
sudo pip3 install Adafruit_DHT


# install Modules - soilTemperature sensor
echo -e ""$BLUE"Install modules for soil Temperature sensor.."
echo -e ""$BLUE"enable 1-Wire.."
echo -e "$NORMAL"
sudo sed -i -e '$a dtoverlay=w1-gpio' /boot/config.txt
echo -e ""$BLUE"set up certain functions.."
echo -e "$NORMAL"
sudo modprobe w1-gpio
sudo modprobe w1-therm


# install Modules - ventilation (cooling)
echo -e ""$BLUE"Install modules for ventilation (cooling).."
echo -e "$NORMAL"
sudo apt-get install gcc libusb-dev -y
git clone https://github.com/codazoda/hub-ctrl.c
cd hub-ctrl.c/
gcc -o hub-ctrl hub-ctrl.c -lusb
cd .. # jump to previous path


# install database
echo -e ""$BLUE"install database.."
echo -e "$NORMAL"
sudo apt install mariadb-server -y
pip3 install mariadb

echo -e ""$BLUE"start setup.."
echo -e "$NORMAL"
sudo mysql_secure_installation


# clone GitHub Repository
#echo -e ""$BLUE"Clones easygreenhouse repository.."
#git clone https://github.com/JonesMCL/easygreenhouse.git

# End
echo -e ""$GREEN"Script was installed successfully."
echo -e ""$BLUE"Your version of the website: v x.x.x"
echo -e ""$BLUE"If a newer version is available, you can update your website at any time using the update script."
echo -e ""$BLUE"Learn more about the update script by checking out this project on GitHub."

# Query
read -p "To complete this installation, the Raspberry Pi must be restarted. Reboot now? (y/n) " rebootNow
if [ "$rebootNow" = y ];
  then
  echo -e ""$ORANGE"Script end. Restart in progress.."
  echo -e "$NORMAL"
  sudo reboot
  else
    echo -e ""$ORANGE"Cancelled. Please restart the Raspberry Pi soon so that the easygreenhouse can run without problems."
    echo -e ""$ORANGE"You can reboot with this command: sudo reboot"
    echo -e ""$ORANGE"Script end."
fi



