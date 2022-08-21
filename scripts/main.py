import mariadb
import sys
import time
import datetime
import Adafruit_ADS1x15
from DS18B20classfile import DS18B20
import Adafruit_DHT
from time import sleep

# Connect to MariaDB Platform

conn = mariadb.connect(
    user="SECRET_USER",
    password="SECRET_PASSWORD",
    host="SECRET_HOST",
    port=SECRET_PORT,
    database="SECRET_DATABASE")
cur = conn.cursor()

# sudo apt-get update && sudo apt-get upgrade -y
# sudo apt-get install python3-pip
# sudo python3 -m pip install --upgrade pip setuptools wheel
# One Wire Schnittstelle aktivieren und testen
# I2C Schnittstelle aktivieren
# sudo pip3 install Adafruit_DHT
# python -m pip install redis
# sudo apt-get install build-essential python-dev git
# pip install smbus
# git clone https://github.com/adafruit/Adafruit_Python_ADS1x15
# cd Adafruit_Python_ADS1x15
# sudo python3 setup.py install
# cd..
# python3 main.py


# BODENFEUCHTESENSOR / SOIL MOISTURE SENSOR
adc = Adafruit_ADS1x15.ADS1115() # Create an ADS1115 ADC (16-bit) instance
GAIN = 1
# TEMPERATURE SENSOR
degree_sign = u'\xb0' # degree sign
devices = DS18B20()
count = devices.device_count()
names = devices.device_names()

# LUFTTEMPERATUR und LUFTFEUCHTE - DHT11 sensor connected to GPIO12 and GPIO16.
sensor = Adafruit_DHT.DHT22
pin1 = 12
pin2 = 16

try: # Main program loop
    while True:
        #BODENFEUCHTESENSOR / SOIL MOISTURE SENSOR
        for x in range(3):
            valuesSoilMoisture = adc.read_adc(x, gain=GAIN)  # Read the ADC channel 0 value
            valuesSoilMoisture -= 3535
            valuesSoilMoisture /= 16677
            valuesSoilMoisture = int((1 - valuesSoilMoisture) * 100)

            # insert information
            try:
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S')
                sensorID = "SoilMoisture" + str(x + 1)
                cur.execute("INSERT INTO soilMoist (sensorid,timestamp,messwert) VALUES (?, ?, ?)",
                            (sensorID, dt, valuesSoilMoisture))
            except mariadb.Error as e:
                print(f"Error: {e}")

            conn.commit()


        # SOIL TEMPERATURE SENSOR
        i = 0
        while i < count:
            container = devices.tempC(i)

            #insert information 
            try: 
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S')
                name = "soilTemp" + str(i)
                cur.execute("INSERT INTO soilTemp (sensorid,timestamp,messwert) VALUES (?, ?, ?)", (name,dt,round(container,1))) 
            except mariadb.Error as e: 
                print(f"Error: {e}")

            conn.commit() 

            i = i + 1

        # LUFTTEMPERATUR und LUFTFEUCHTE
        humidity1, temperature1 = Adafruit_DHT.read_retry(sensor,
                                                          pin1)
        humidity2, temperature2 = Adafruit_DHT.read_retry(sensor,
                                                          pin2)
        #Allgemeiner Sleep Befehl für alle Sensoren
        time.sleep(1)

        # LUFTTEMPERATUR und LUFTFEUCHTE Print
        if humidity1 is not None and temperature1 is not None:

            #insert information 
            try: 
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S')
                cur.execute("INSERT INTO humidity (sensorid,timestamp,messwert) VALUES (?, ?, ?)", ("humidity1",dt,humidity1)) 
            except mariadb.Error as e: 
                print(f"Error: {e}")

            conn.commit() 

            #insert information 
            try:
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S') 
                cur.execute("INSERT INTO airTemp (sensorid,timestamp,messwert) VALUES (?, ?, ?)", ("airTemp1",dt,temperature1)) 
            except mariadb.Error as e: 
                print(f"Error: {e}")

            conn.commit() 
        else:
            print("Failed to get reading. Try again!")

        if humidity2 is not None and temperature2 is not None:

            #insert information 
            try: 
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S')
                cur.execute("INSERT INTO humidity (sensorid,timestamp,messwert) VALUES (?, ?, ?)", ("humidity2",dt,humidity2)) 
            except mariadb.Error as e: 
                print(f"Error: {e}")

            conn.commit() 

            #insert information 
            try: 
                dt = datetime.datetime.now()
                dt.strftime('%d%m%Y%H%M%S')
                cur.execute("INSERT INTO airTemp (sensorid,timestamp,messwert) VALUES (?, ?, ?)", ("airTemp2",dt,temperature2)) 
            except mariadb.Error as e: 
                print(f"Error: {e}")

            conn.commit() 
        else:
            print("Failed to get reading. Try again!")

# Scavenging work after the end of the program
except KeyboardInterrupt:
    print('Script end!')

# end database connection
conn.close()
