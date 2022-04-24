import { response } from 'express';
const axios = require("axios");
let constants = require('../config/config');
const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient({
    host: constants.REDISHOST,
    port: constants.REDISPORT,
    password: constants.REDISPWD,
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
    checkFirstRegistration,
    updateUser,
    getUser,
    deleteUser
}
