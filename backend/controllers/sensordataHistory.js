const axios = require("axios");
let config = require('../config/config');
const mariadb = require('mariadb');
import { json } from 'body-parser';
import colormaps from '../helpers/colormaps.js'

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
        let color = await colormaps.colormapTemp(fixedAverage);

        let answer = {
            "value": fixedAverage + "°C",
            "color": color
        }

        return res.json({
            status: 200, message: '1', result: JSON.stringify(answer)
        });

    } catch (err) {
        console.log(err)
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
        let color = await colormaps.colormapTemp(fixedAverage);
  
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
        let color = await colormaps.colormapMoisture(fixedAverage);
      
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
        let color = await colormaps.colormapMoisture(fixedAverage);
      
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

// Get average soil temperature separated by month from the last 12 months
async function getAverageSoiltempMonthly (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        let obj = {
            table: []
         };

        for(let i = 0; i < 12; i++) {
            let month = i + 1;
            let year = new Date().getFullYear();
            let query = "SELECT * FROM soilTemp WHERE MONTH(timestamp) =" + month + " AND YEAR(timestamp) = " + year;
            const result = await connection.query(query);
            let oneMonthlyAverage = await calculateMonthlyAverage(result);
            obj.table.push({month: month, value: oneMonthlyAverage});
        };
        var jsonResponse = JSON.stringify(obj);

        return res.json({
            status: 200, message: '1', result: JSON.stringify(jsonResponse)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average soil temperature from database!'});
    } finally {
        if (connection) return connection.end();
    }
};

// Get average air temperature separated by month from the last 12 months
async function getAverageAirtempMonthly (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        let obj = {
            table: []
         };

        for(let i = 0; i < 12; i++) {
            let month = i + 1;
            let year = new Date().getFullYear();
            let query = "SELECT * FROM airTemp WHERE MONTH(timestamp) =" + month + " AND YEAR(timestamp) = " + year;
            const result = await connection.query(query);
            let oneMonthlyAverage = await calculateMonthlyAverage(result);
            obj.table.push({month: month, value: oneMonthlyAverage});
        };
        var jsonResponse = JSON.stringify(obj);

        return res.json({
            status: 200, message: '1', result: JSON.stringify(jsonResponse)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average air temperature from database!'});
    } finally {
        if (connection) return connection.end();
    }
};

// Get average soil moisture separated by month from the last 12 months
async function getAverageSoilMoistMonthly (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        let obj = {
            table: []
         };

        for(let i = 0; i < 12; i++) {
            let month = i + 1;
            let year = new Date().getFullYear();
            let query = "SELECT * FROM soilMoist WHERE MONTH(timestamp) =" + month + " AND YEAR(timestamp) = " + year;
            const result = await connection.query(query);
            let oneMonthlyAverage = await calculateMonthlyAverage(result);
            obj.table.push({month: month, value: oneMonthlyAverage});
        };
        var jsonResponse = JSON.stringify(obj);

        return res.json({
            status: 200, message: '1', result: JSON.stringify(jsonResponse)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average soil moisture from database!'});
    } finally {
        if (connection) return connection.end();
    }
};

// Get average humidity separated by month from the last 12 months
async function getAverageHumidityMonthly (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        let obj = {
            table: []
         };

        for(let i = 0; i < 12; i++) {
            let month = i + 1;
            let year = new Date().getFullYear();
            let query = "SELECT * FROM humidity WHERE MONTH(timestamp) =" + month + " AND YEAR(timestamp) = " + year;
            const result = await connection.query(query);
            let oneMonthlyAverage = await calculateMonthlyAverage(result);
            obj.table.push({month: month, value: oneMonthlyAverage});
        };
        var jsonResponse = JSON.stringify(obj);

        return res.json({
            status: 200, message: '1', result: JSON.stringify(jsonResponse)
        });

    } catch (err) {
        return res.json({ status: 400, message: 'Could not fetch average humidity from database!'});
    } finally {
        if (connection) return connection.end();
    }
};

async function calculateMonthlyAverage(jsonObject) {
    let resultLength = Object.keys(jsonObject).length;
    let counter = 0;

    for (let i = 0; i < resultLength -1; i++) {
        counter += parseFloat(jsonObject[i].messwert);
    }

    let average = counter / (resultLength - 1);
    let fixedAverage = average.toFixed(1);

    return fixedAverage;
}

async function getAverageMonthly(tablename, year) {
    // Hier nicht die JSON response hin auslkagern, aber zumindest das Holen der
    // monatlichen Tabellen, also der For-Schlefe !!
}

export default {
    getAverageSoiltemp,
    getAverageAirtemp,
    getAverageSoilMoist,
    getAverageHumidity,
    getAverageSoiltempMonthly,
    getAverageAirtempMonthly,
    getAverageSoilMoistMonthly,
    getAverageHumidityMonthly
}
