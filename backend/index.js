const express = require("express");
const cors = require('cors');
const chalk = require('chalk');
const redis = require("redis");
const app = express();
const server = require('http').createServer(app);
let bodyParser = require('body-parser');
app.use(bodyParser.json());
import ApiRoutes from './routes';

let constants = require('./config/constants');
const client = redis.createClient({
    host: constants.REDISHOST,
    port: constants.REDISPORT,
    password: constants.REDISPWD,
    retry_strategy: function(options) {
      if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error("The server refused the connection");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error("Retry time exhausted");
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
});

app.use(cors())

// Add the ApiRoutes stack to the server
app.use('/api', ApiRoutes)
portfolio.createValueHistory();

client.on("error", (err) => {
    console.log(err);
})

app.get('/', cors(), (req, res)=> {
    try {
        client.get("ping", function(err, reply) {
            res.send(reply.toString());
        })
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

server.listen(constants.APPLICATIONPORT, err => {
    if (err) {
      console.log(chalk.red('PROBLEM! Cannot run!!!'))
    } else {
      console.log(chalk.green.bold(
        " Backend server is working", '\n',
        "Host is ", constants.APPLICATIONHOST, '\n',
        "App listen on port: ", constants.APPLICATIONPORT 
      ))
    }
  })
