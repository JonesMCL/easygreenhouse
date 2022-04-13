import { response } from 'express';
const axios = require("axios");
let config = require('../config/config');
const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient({
    host: config.REDISHOST,
    port: config.REDISPORT,
    password: config.REDISPWD,
    retry_strategy: function(options) {
      if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // an individual error
        return new Error("The server refused the connection");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with an individual error
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
const scanner = new redisScan(client);

/**
 * @param req contains a userid, a password, and an email
 * @return JSON object with a status code, a message, and the body of the request or an error
 * Add a new user with a userid, a password, an email, the default role "0", 
 * or the admin role "1" if no user has registered in the system before
 */
//BUG: We only check if Userid exists, not if mail address is already in use 
async function addUser (req, res) {
    const newUser = req.body;
    let uid = JSON.parse(JSON.stringify(req.body.uid));
    let pwd = JSON.parse(JSON.stringify(req.body.pwd));
    let email = JSON.parse(JSON.stringify(req.body.email));
    let key = uid + ":Users";

    client.exists(key, (err, reply) => {
      if (reply === 1) {
        return res.json({ status: 400, message: '0', newUser }); //user exists already
      }
      if(checkFirstRegistration() == 0) { //other users registered before 
        // Add New User
        client.hset(key, "pwd", pwd, "email", email, "role", "0", (error, result) => {
          if (error) {
            return res.json({ status: 400, message: 'Could not add new user to database', error });
          }
          return res.json({
            result, status: 200, message: '1', newUser //user created successfully
          });
        });
      }
      else if (checkFirstRegistration() == 1){ //first registration
        // Add New User
        client.hset(key, "pwd", pwd, "email", email, "role", "1", (error, result) => {
          if (error) {
            return res.json({ status: 400, message: 'Could not add new user to database', error });
          }
          return res.json({
            result, status: 200, message: '1', newUser //user created successfully
          });
        });
      }
    });
  };

  /**
 * @return "0" or "1"
 * "0", if other users have registered before, "1", if this is the first registration
 */
async function checkFirstRegistration () {
  let key = "admin:Users";

  client.exists(key, (err, reply) => {
    if (reply === 1) {
      return 0; //other users already registered
    }
    else{
      return 1; //first registration
    }
  });
};

/**
 * @param req contains a userid, a password, an email, and a role
 * @return JSON object with a status code, a message, and the body of the request or an error
 * Update a user with a userid, a password, an email, and a role to the database
 */
async function updateUser (req, res) {
  const newUser = req.body;
  let uid = JSON.parse(JSON.stringify(req.body.uid));
  let pwd = JSON.parse(JSON.stringify(req.body.pwd));
  let email = JSON.parse(JSON.stringify(req.body.email));
  let role = JSON.parse(JSON.stringify(req.body.role));
  let key = uid + ":Users";

  client.exists(key, (err, reply) => {
    if (reply === 1) {
      client.hset(key, "pwd", pwd, "email", email, "role", role, (error, result) => {
        if (error) {
          return res.json({ status: 400, message: 'User could not be updated', error });
        }
        return res.json({
          result, status: 200, message: '1', newUser
        });
      },
    );
    }
    else {
      return res.json({ status: 400, message: 'User could not be found in database', error });
    }
  });
};

/**
 * @param req contains the url with a userid as last parameter
 * @return JSON object with a status code, a message, and an error if the request fails, or the user object with password, email, balance, and riskMode if the request succeeds 
 * Get a user with all its information by userid
 */
async function getUser (req, res) {
    let uid = req.url.split("/").pop();
    let key = uid + ":Users";
    
    client.exists(key, (err, reply) => {
      if (reply === 1) {
        client.hgetall(key, (err, user) => {
          if (err) {
            return res.json({ status: 400, message: 'Could not get user data from database', err });
          }
          return res.json(user);
        });
      }
      else {
        return res.json({ status: 400, message: 'Requested user could not be found in database', err });
      }
    });
};

/**
 * @param req contains the url with a userid as last parameter
 * @return JSON object with a status code, a message, and a result or an error
 * Delete a user with all its information by userid
 */
async function deleteUser (req, res) {
    let uid = req.url.split("/").pop();
    let userKey = uid + ":Users";

    client.exists(userKey, (err, reply) => {
      if (reply === 1) {
        client.del(userKey, (err, result) => {
          if (err) {
            return res.json({ status: 400, message: 'User could not be deleted', err });
          }
          let query = "http://localhost:4000/api/users/" + uid;
          axios.get(query).then(
            (response) => {
              return res.json({ message: 'User successfully deleted', response });
            },
            (err) => {
              return res.json({ message: 'User could not be deleted', err });
            }
          );
        });
      }
      else {
        return res.json({ status: 400, message: 'Requested user could not be found in database', err });
      }
    });
};

export default {
    addUser,
    checkFirstRegistration,
    updateUser,
    getUser,
    deleteUser
}
