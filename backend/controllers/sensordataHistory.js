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


async function getAverageSoiltemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilTemp WHERE timestamp> now() - INTERVAL 12 month");
        let resultLength = Object.keys(result).length;
        let counter = 0;

        for (let i = 0; i < resultLength -1; i++) {
            counter += parseFloat(result[i].messwert);
        }

        let average = counter / (resultLength - 1);
        return res.json({
            status: 200, message: '1', result: average.toFixed(1)
          });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average soiltemp from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

/*
    getAverageSoiltempMonthly,
    getAverageAirtempMonthly,
    getAverageAirtemp,
    getAverageSoilMoistMonthly,
    getAverageSoilMoist,
    getAverageHumidityMonthly,
    getAverageHumidity
    */

export default {
    getAverageSoiltemp
}