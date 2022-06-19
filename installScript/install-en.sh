#!/bin/bash
# This script installs all the required components and libaries needed for the EASYGREENHOUSE project by Easy Tec.
# This script must be executed only once!
# On easytec.tech/xxx you can find a manual in German and English.
# This script is in beta version. This script has been tested, but we do not assume any liability when using the script. 
# Please run this script on a newly installed instance on a Raspberry Pi 3b+ (no guarantee, might work on other models as well). 
#

# Version 1.0.0
# Version BETA

# Variables - 


# DO NOT AJUST! - Script begin #

# Welcome
echo "Welcome! With this script from Easy Tec you install the software for the EASYGREENHOUSE on your Raspberry Pi."
read -p "Do you want to continue? (y/n)" query_continue

if [ "$query_continue" == "n" ];
  then
    echo "Abort.."
    exit 1
  else
    echo "Okay, go ahead.."
fi

#Queries

# Abfrage1 (z.B. sowas wie Passwort oder so - kann er selber anlegen..)
read -p "Please enter your external domain for the website (or IP address for -exclusively- internal accesses): " Abfrage1
read -p "Statement correct? (y/n): $Abfrage1 " Abfrage1_1
if [ "$Abfrage1_1" == "n" ];
  then
    read -p "Please enter your external domain for the website (or IP address for -exclusively- internal accesses): " Abfrage1
    read -p "Statement correct? (y/n): $Abfrage1 " Abfrage1_2
    if [ "$Abfrage1_2" == "n" ];
      then
        echo "Too many misstakes. Please run the script again. Abort.."
    else
        echo "Okay, go ahead.."
    fi
  else
    echo "Okay, go ahead.."
fi


# Script (From here, all the necessary parts are installed.)

# install
echo "Install required parts.."
echo "This may take a few minutes.."

# update system
echo "Update system.."
sudo apt-get update
sudo apt-get upgrade

# install Modules - Soil moisture sensor
echo "Install modules for soil moisture sensor.."
sudo apt-get install build-essential python-dev git
pip install smbus
git clone https://github.com/adafruit/Adafruit_Python_ADS1x15
cd Adafruit_Python_ADS1x15 && sudo python3 setup.py install

#
# install Modules - 
echo "Install modules for xxxxxxxxxx.."


# End
echo "Script was installed successfully."
echo "Your version of the website: v x.x.x"
echo "If a newer version is available, you can update your website at any time using the update script."
echo "Learn more about the update script by checking out this project GitHub."
echo "Script end."