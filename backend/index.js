const express = require("express");
const cors = require('cors');
const chalk = require('chalk');
const app = express();
const server = require('http').createServer(app);
let bodyParser = require('body-parser');
app.use(bodyParser.json());
import ApiRoutes from './routes';
let constants = require('./config/config.js');

app.use(cors())

// Add the ApiRoutes stack to the server
app.use('/api', ApiRoutes)

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
