const axios = require("axios");
let jwt = require('jsonwebtoken');
let bcrypt = require("bcryptjs");
let config = require('../config/config');
let helpers = require('../helpers/helpers')
const mariadb = require('mariadb');

const mariaDBpool = mariadb.createPool({
    host: config.MARIADBHOST, 
    user: config.MARIADBUSER, 
    port: config.MARIADBPORT,
    password: config.MARIADBPWD,
    database: config.MARIADBDATABASE,
    connectionLimit: 5
});

// Beispiel für Conncetion zu MariaDB öffnen, query machen und schließen 
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


const jwt_secret = config.JWT_SECRET;
const jwt_expiration = 60 * 10;
const jwt_refresh_expiration = 60 * 60 * 24 * 30;

/**
 * @param req contains a userid, a password, and an email
 * @return JSON object with a status code, a message, and the body of the request or an error
 * Add a new user with a userid, a password, an email, the default role "0", 
 * or the admin role "1" if no user has registered in the system before
 */
//BUG: We only check if Userid exists, not if mail address is already in use 
// Check first registration not necessary? User creates first admin account during install script 
async function signup (req, res) {
    const newUser = req.body;
    let uid = JSON.parse(JSON.stringify(req.body.uid));
    let pwd = JSON.parse(JSON.stringify(bcrypt.hashSync(req.body.pwd, 8)));
    let email = JSON.parse(JSON.stringify(req.body.email));
    let key = uid + ":Users";
    
    client.exists(key, (err, reply) => {
      if (reply === 1) {
        return res.json({ status: 400, message: '0', newUser }); //user exists already
      }
      if(helpers.checkFirstRegistration() == 0) { //other users registered before 
        // Add New User
        client.hset(key, "pwd", pwd, "email", email, "role", "0", (error, result) => {
          if (error) {
            return res.json({ status: 400, message: 'Could register new user', error });
          }
          return res.json({
            result, status: 200, message: '1', newUser //user created successfully
          });
        });
      }
      else if (helpers.checkFirstRegistration() == 1){ //first registration
        // Add New User
        client.hset(key, "pwd", pwd, "email", email, "role", "1", (error, result) => {
          if (error) {
            return res.json({ status: 400, message: 'Could not register new user', error });
          }
          return res.json({
            result, status: 200, message: '1', newUser //user created successfully
          });
        });
      }
    });
  };

  //UPDATE TO REDIS USE!!!!!!!!!!!!
  //RETURN ROLE AS WELL!!!!!!!!!!!!
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

export default {
    signup
}