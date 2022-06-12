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

/*
async function getAverageAirtemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection(); 
        const result = await connection.query("SELECT messwert FROM airTemp ORDER BY id DESC LIMIT 2");
        console.log(result); //[ {val: 1}, meta: ... ]
        let average = (parseFloat(result[0].messwert) + parseFloat(result[1].messwert)) / 2;
        console.log(average.toFixed(1));
        //TODO auch json response wenn nichts gefunden,...
        return res.json({
            status: 200, message: '1', result: average.toFixed(1) // result successfully retrieved
          });
        
        //const res = await connection.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        throw err;
    } finally {
        if (connection) return connection.end();
    }
    
  };*/

export default {
}