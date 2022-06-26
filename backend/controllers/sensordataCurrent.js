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

async function getAverageSoiltemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilTemp ORDER BY id DESC LIMIT 2");
        let average = (parseFloat(result[0].messwert) + parseFloat(result[1].messwert)) / 2;
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
        return res.json({ status: 400, message: 'Could not fetch average soiltemp from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

async function getSplitSoiltemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilTemp ORDER BY id DESC LIMIT 2");
        let soilTemps = {
            "soilTemp1": parseFloat(result[0].messwert) + "°C",
            "color1": await helpers.colormapTemp(result[0].messwert),
            "soilTemp2": parseFloat(result[1].messwert) + "°C",
            "color2": await helpers.colormapTemp(result[1].messwert)
        }
        let soilTempsJson = JSON.stringify(soilTemps);
        return res.json({
            status: 200, message: '1', result: soilTempsJson
          });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch single soiltemp values from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

async function getAverageAirtemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection(); 
        const result = await connection.query("SELECT messwert FROM airTemp ORDER BY id DESC LIMIT 2");
        let average = (parseFloat(result[0].messwert) + parseFloat(result[1].messwert)) / 2;

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
        return res.json({ status: 400, message: 'Could not fetch average airtemp from database!' });
    } finally {
        if (connection) return connection.end();
    }  
};

async function getSplitAirtemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM airTemp ORDER BY id DESC LIMIT 2");
        let airTemps = {
            "airTemp1": parseFloat(result[0].messwert) + "°C",
            "color1": await helpers.colormapTemp(result[0].messwert),
            "airTemp2": parseFloat(result[1].messwert) + "°C",
            "color2": await helpers.colormapTemp(result[1].messwert),
        }
        let airTempsJson = JSON.stringify(airTemps);
        return res.json({
            status: 200, message: '1', result: airTempsJson
          });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch single airtemp values from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

async function getAverageSoilMoist (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilMoist ORDER BY id DESC LIMIT 3");
        let average = (parseFloat(result[0].messwert) + parseFloat(result[1].messwert) + 
                      parseFloat(result[2].messwert)) / 3;
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
        return res.json({ status: 400, message: 'Could not fetch average soil moisture from database!' });
    } finally {
        if (connection) return connection.end();
    }   
};

async function getSplitSoilMoist (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM soilMoist ORDER BY id DESC LIMIT 3");
        let soilMoist = {
            "soilMoisture1": parseFloat(result[0].messwert) + "%",
            "color1": await helpers.colormapMoisture(result[0].messwert),
            "soilMoisture2": parseFloat(result[1].messwert) + "%",
            "color2": await helpers.colormapMoisture(result[1].messwert),
            "soilMoisture3": parseFloat(result[2].messwert) + "%",
            "color3": await helpers.colormapMoisture(result[2].messwert)
        }
        let soilMoistJson = JSON.stringify(soilMoist);
        return res.json({
            status: 200, message: '1', result: soilMoistJson
          });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch single soil moisture values from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

async function getAverageHumidity (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection(); 
        const result = await connection.query("SELECT messwert FROM humidity ORDER BY id DESC LIMIT 2");
        let average = (parseFloat(result[0].messwert) + parseFloat(result[1].messwert)) / 2;
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

async function getSplitHumidity (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        const result = await connection.query("SELECT messwert FROM humidity ORDER BY id DESC LIMIT 2");
        let soilMoist = {
            "humidity1": parseFloat(result[0].messwert) + "%",
            "color1": await helpers.colormapMoisture(result[0].messwert),
            "humidity2": parseFloat(result[1].messwert) + "%",
            "color2": await helpers.colormapMoisture(result[1].messwert),
        }
        let soilMoistJson = JSON.stringify(soilMoist);
        return res.json({
            status: 200, message: '1', result: soilMoistJson
          });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch single humidity values from database!' });
    } finally {
        if (connection) return connection.end();
    }
};

export default {
    getAverageSoiltemp,
    getSplitSoiltemp,
    getAverageAirtemp,
    getSplitAirtemp,
    getAverageSoilMoist,
    getSplitSoilMoist,
    getAverageHumidity,
    getSplitHumidity
}