import redis
from secret import redisPW
from secret import redisHost
from secret import redisPort
import time
import Adafruit_ADS1x15

#redis connection with responses to string
redis_client = redis.Redis(host=redisHost, port=redisPort, password=redisPW ,db=0, decode_responses=True)

adc = Adafruit_ADS1x15.ADS1115() # Create an ADS1115 ADC (16-bit) instance
GAIN = 1
try: # Main program loop
    while True:   
        values = adc.read_adc(0, gain=GAIN) # Read the ADC channel 0 value
        print('{0:>6}'.format(values))
        time.sleep(0.5)
# Scavenging work after the end of the program
#except KeyboardInterrupt:
#print('Script end!')

