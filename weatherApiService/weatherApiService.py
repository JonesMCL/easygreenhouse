import redis
from secret import redisPW
from secret import redisHost
from secret import redisPort

#redis connection with responses to string
redis_client = redis.Redis(host=redisHost, port=redisPort, password=redisPW ,db=0, decode_responses=True)
