import { response } from 'express';
const axios = require("axios");
let config = require('../config/config');
const mariadb = require('mariadb');

const mariaDBpool = mariadb.createPool({
  host: config.MARIADBHOST, 
  user: config.MARIADBUSER, 
  port: config.MARIADBPORT,
  password: config.MARIADBPWD,
  database: config.MARIADBDATABASE,
  connectionLimit: 5
});
// Beispiel für Connection zu DB und schließen -> Einbauen in Funktionen 
async function asyncFunction() {
  let connection;
  try {
	connection = await mariaDBpool.getConnection();
	const rows = await connection.query("SELECT * FROM soilMoist");
	console.log(rows); //[ {val: 1}, meta: ... ]
	//const res = await connection.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	//console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (connection) return connection.end();
  }
}

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
    updateUser,
    getUser,
    deleteUser
}
