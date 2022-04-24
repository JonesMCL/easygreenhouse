const config = {}

config.REDISHOST = "domainOfDb" //TODO UPDATE
config.REDISPORT = 9763 //TODO UPDATE
config.REDISPWD = "samplePW" //TODO UPDATE
config.APPLICATIONHOST = '0.0.0.0' //TODO UPDATE
config.APPLICATIONPORT = 4000 //TODO UPDATE
config.MONGODBHOST = "" //TODO UPDATE
config.MONGODBPORT =  //TODO UPDATE
config.MONGODBPWD = "" //TODO UPDATE

module.exports.REDISHOST = config.REDISHOST
module.exports.REDISPORT = config.REDISPORT
module.exports.REDISPWD = config.REDISPWD
module.exports.APPLICATIONHOST = config.APPLICATIONHOST
module.exports.APPLICATIONPORT = config.APPLICATIONPORT
module.exports.MONGODBHOST = config.MONGODBHOST
module.exports.MONGODBPORT = config.MONGODBPORT
module.exports.MONGODBPWD = config.MONGODBPWD