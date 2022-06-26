const axios = require("axios");
let config = require('../config/config');
const mariadb = require('mariadb');
import helpers from '../helpers/helpers.js'

const mariaDBpool = mariadb.createPool({
    host: config.MARIADBHOST, 
    user: config.MARIADBUSER, 
    port: config.MARIADBPORT,
    password: config.MARIADBPWD,
    database: config.MARIADBDATABASE,
    connectionLimit: 5
});

// get the average soil temperature from the last 12 months
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
        let fixedAverage = average.toFixed(1);
        let color = await helpers.colormapTemp(fixedAverage);

        let answer = {
            "value": fixedAverage + "°C",
            "color": color
        }

        return res.json({
            status: 200, message: '1', result: JSON.stringify(answer)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average soil temperature from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

// get the average air temperature from the last 12 months
async function getAverageAirtemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM airTemp WHERE timestamp> now() - INTERVAL 12 month");
        let resultLength = Object.keys(result).length;
        let counter = 0;

        for (let i = 0; i < resultLength -1; i++) {
            counter += parseFloat(result[i].messwert);
        }

        let average = counter / (resultLength - 1);
        let fixedAverage = average.toFixed(1);
        let color = await helpers.colormapTemp(fixedAverage);
  
        let answer = {
            "value": fixedAverage + "°C",
            "color": color
        }
  
        return res.json({
            status: 200, message: '1', result: JSON.stringify(answer)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average air temperature from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

// get the average soil moisture value from the last 12 months
async function getAverageSoilMoist (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilMoist WHERE timestamp> now() - INTERVAL 12 month");
        let resultLength = Object.keys(result).length;
        let counter = 0;

        for (let i = 0; i < resultLength -1; i++) {
            counter += parseFloat(result[i].messwert);
        }

        let average = counter / (resultLength - 1);
        let fixedAverage = average.toFixed(1);
        let color = await helpers.colormapMoisture(fixedAverage);
      
        let answer = {
            "value": fixedAverage + "%",
            "color": color
        }
      
        return res.json({
            status: 200, message: '1', result: JSON.stringify(answer)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average soil moist from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

// get the average humidity value from the last 12 months
async function getAverageHumidity (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM humidity WHERE timestamp> now() - INTERVAL 12 month");
        let resultLength = Object.keys(result).length;
        let counter = 0;

        for (let i = 0; i < resultLength -1; i++) {
            counter += parseFloat(result[i].messwert);
        }

        let average = counter / (resultLength - 1);
        let fixedAverage = average.toFixed(1);
        let color = await helpers.colormapMoisture(fixedAverage);
      
        let answer = {
            "value": fixedAverage + "%",
            "color": color
        }
      
        return res.json({
            status: 200, message: '1', result: JSON.stringify(answer)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average humidity from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

/*
    getAverageSoiltempMonthly,
    getAverageAirtempMonthly,
    getAverageSoilMoistMonthly,
    getAverageHumidityMonthly,
    */

export default {
    getAverageSoiltemp,
    getAverageAirtemp,
    getAverageSoilMoist,
    getAverageHumidity
}