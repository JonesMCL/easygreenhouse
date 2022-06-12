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

//TODO: Erst Bodentemperatur abfragen 
//"INSERT INTO soilTemp (sensorid,timestamp,messwert) VALUES (?, ?, ?)"
async function getAverageSoiltemp (req, res) {

    let connection;
    try {
        connection = await mariaDBpool.getConnection();
        // Wie viele Bodentemperatursensoren haben wir im Einsatz? Danach die Limitzahl richten 
        const result = await connection.query("SELECT messwert FROM soilTemp ORDER BY id DESC LIMIT 2");
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
    
};

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
    
  };

//BENÖTIGTE FUNKTIONEN:
// SIEHE Dokument von Benedikt 
// Sende NaN als Wert, wenn keiner verfügbar -> Dann wird in chart.js der Wert ausgelassen 

// GET für airtempcurrent 
// -> aktuelle Temperatur mit Grad C zeichen dahinter; Farbe wird im Frontend definiert 
// -> Returns: zb 11,8 °C

// GET für airhumidcurrent 
// -> 

export default {
    getAverageSoiltemp,
    getAverageAirtemp
}