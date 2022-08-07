#!/bin/bash
# This script makes an update all required components and libraries needed for the EASYGREENHOUSE project of Easy Tec.
# On easytec.tech/xxx you can find a manual in English and German.
# This script is in beta version. This script has been tested, but we assume no liability when using the script. 
# This script can run on a Raspberry Pi 3b+. (no guarantee, may work on other models as well).

# Version 1.0.0
# Version BETA

# Variables

# current time for database backup
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# colors
NORMAL='\033[39m'
BLUE='\033[34m'
GREEN='\033[1;32m'
RED='\033[1;31m'
ORANGE='\033[1;33m'

# check for root privileges
#
if [ "$(id -u)" != "0" ]
then
	echo -e ""$RED"ERROR: This script must be executed as root!"
	exit 1
fi

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
echo -e ""$GREEN"Welcome! With this script from Easy Tec you update the software for the EASYGREENHOUSE on your Raspberry Pi."
echo -e ""$ORANGE"With this action you agree to the license."
echo -e ""$ORANGE"Also, this script will reinstall your database. The database can be damaged during the backup or restore process."
read -p "Do you want to continue? (y/n)" query_continue

if [ "$query_continue" = n ];
  then
  echo -e ""$RED"Okay, you have not accepted the license. Cancel.."
  exit 0
  else
  echo -e "Okay, go ahead.."
fi


# query which user is used
echo -e "$ORANGE"
read -p "Enter your username: " username

# Script (From here, all the necessary parts are updated.)

# update
echo -e ""$BLUE"Update required parts.."
echo -e ""$BLUE"This may take a few minutes.."

# update system
echo -e ""$BLUE"Update system.."
echo -e "$NORMAL"
sudo apt-get update
sudo apt-get upgrade -y

# update Modules - general
echo -e ""$BLUE"Update general modules.."
echo -e "$NORMAL"
pip3 install --upgrade pip
sudo apt-get install python3-pip -y
sudo apt-get install build-essential python-dev git -y
pip3 install subprocess.run
pip3 install ping3
pip3 install discord-webhook


# update Modules - Soil moisture sensor
echo -e ""$BLUE"Update modules for soil moisture sensor.."
echo -e "$NORMAL"
pip3 install smbus
git clone https://github.com/adafruit/Adafruit_Python_ADS1x15
cd Adafruit_Python_ADS1x15 && sudo python3 setup.py install


# update Modules - Temperature and Humidity sensor
echo -e ""$BLUE"Update modules for Temperature and Humidity sensor.."
echo -e "$NORMAL"
sudo python3 -m pip install --upgrade pip setuptools wheel
sudo pip3 install Adafruit_DHT


# update Modules - soilTemperature sensor
echo -e ""$BLUE"Update modules for soil Temperature sensor.."
echo -e ""$GREEN"Nothing to update."

# install Modules - ventilation (cooling)
echo -e ""$BLUE"Update modules for ventilation (cooling).."
echo -e "$NORMAL"
sudo apt-get install gcc libusb-dev -y


# update database
echo -e ""$BLUE"update database.."
echo -e ""$BLUE"create backup folder if not exist.."
echo -e "$NORMAL"
mkdir -p mysql_backup
echo -e ""$BLUE"backup database.."
echo -e "$NORMAL"
mysqldump -u root -p --events --all-databases > /mysql_backup/fullbackup_$timestamp.sql

if [ ! -f /home/$username/mysql_backup/fullbackup_$timestamp.sql ]; then
    echo -e ""$RED"wrong password or error!"
    echo -e ""$RED"Please try again!"
    echo -e "$NORMAL"
    mysqldump -u root -p --events --all-databases > /mysql_backup/fullbackup_$timestamp.sql

    if [ ! -f /home/$username/mysql_backup/fullbackup_$timestamp.sql ]; then
      echo -e ""$RED"wrong password or error!"
      echo -e ""$RED"Backup could not be created! abort.."
      exit 1
    else
      echo -e ""$ORANGE"Backup was created. Go ahead.."
    fi  
else
echo -e ""$ORANGE"Backup was created. Go ahead.."
fi

echo -e ""$BLUE"stop database.."
echo -e "$NORMAL"
sudo service mysql stop

echo -e ""$BLUE"reinstall database.."
echo -e "$NORMAL"
sudo apt install mariadb-server -y

echo -e ""$BLUE"update database.."
echo -e "$NORMAL"
mysql_upgrade

echo -e ""$BLUE"restore database.."
echo -e "$NORMAL"
sudo mysql -u root -p mysql * < backup.sql

echo -e ""$BLUE"start setup.."
echo -e "$NORMAL"
sudo mysql_secure_installation



# clone GitHub Repository
echo -e ""$BLUE"Clones easygreenhouse repository.."
echo -e "$NORMAL"
git pull https://github.com/JonesMCL/easygreenhouse.git

# End
echo -e ""$GREEN"Script was installed successfully."
echo -e ""$BLUE"Your version of the website: v x.x.x"
echo -e ""$BLUE"If a newer version is available, you can update your website at any time using the update script."
echo -e ""$BLUE"Learn more about the update script by checking out this project on GitHub."

# Query
read -p "To complete this update, the Raspberry Pi must be restarted. Reboot now? (y/n) " rebootNow
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



