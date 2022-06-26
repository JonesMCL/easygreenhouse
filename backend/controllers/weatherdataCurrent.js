const axios = require("axios");
let config = require('../config/config');
import helpers from '../helpers/helpers.js'

let apiCall = "https://api.weather.com/v2/pws/observations/current?stationId=" + config.STATION_ID + "&numericPrecision=decimal&format=json&units=m&apiKey=" + config.WEATHER_API_KEY

//Get current air temperature
async function getAirtemp (req, res) {

    axios.get(apiCall).then(
        async (response) => {
            let temp = response.data.observations[0].metric.temp;
            let color = await helpers.colormapTemp(temp);
        
            let answer = {
                "value": temp + "°C",
                "color": color
            }
        
            return res.json({
                status: 200, message: '1', result: JSON.stringify(answer)
            });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch airtemp from weather api!', error });
        }
        );  
};

//Get current humidity
async function getHumidity (req, res) {

    axios.get(apiCall).then(
        async (response) => {
            let humidity = response.data.observations[0].humidity;
            let color = await helpers.colormapMoisture(humidity);
        
            let answer = {
                "value": humidity + "%",
                "color": color
            }
        
            return res.json({
                status: 200, message: '1', result: JSON.stringify(answer)
            });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch humidity from weather api!', error });
        }
        );  
};

//Get current wind speed
async function getWindSpeed (req, res) {

    axios.get(apiCall).then(
        (response) => {
            let windSpeed = response.data.observations[0].metric.windSpeed;
            return res.json({
                status: 200, message: '1', result: windSpeed
              });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch wind speed from weather api!', error });
        }
        );  
};

//Get current wind direction
async function getWindDir(req, res) {

    axios.get(apiCall).then(
        async (response) => {
            let winddir = response.data.observations[0].winddir;
            let winddirCompass = await helpers.degToCompass(winddir);
            return res.json({
                status: 200, message: '1', result: winddirCompass
              });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch wind direction from weather api!', error });
        }
        );  
};

//Get current air pressure
async function getPressure (req, res) {

    axios.get(apiCall).then(
        (response) => {
            let pressure = response.data.observations[0].metric.pressure;
            return res.json({
                status: 200, message: '1', result: pressure
              });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch pressure from weather api!', error });
        }
        );  
};

//Get current amount of rain in mm
async function getPrecipTotal (req, res) {

    axios.get(apiCall).then(
        (response) => {
            let precipTotal = response.data.observations[0].metric.precipTotal;
            return res.json({
                status: 200, message: '1', result: precipTotal
              });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch precipTotal from weather api!', error });
        }
        );  
};

//Get current amount of rain in mm/hr
async function getPrecipRate (req, res) {

    axios.get(apiCall).then(
        (response) => {
            let precipRate = response.data.observations[0].metric.precipRate;
            return res.json({
                status: 200, message: '1', result: precipRate
              });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch precipRate from weather api!', error });
        }
        );  
};

//Get current UV index
async function getUV (req, res) {

    axios.get(apiCall).then(
        async (response) => {
            let uv = response.data.observations[0].uv;
            let color = await helpers.colormapUV(uv);
            console.log("uv: " + uv);
            console.log("color: " + color);
        
            let answer = {
                "value": uv,
                "color": color
            }
        
            return res.json({
                status: 200, message: '1', result: JSON.stringify(answer)
            });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch uv from weather api!', error });
        }
        );  
};

//Get current solarRadiation in w/m2
async function getSolarRadiation (req, res) {

    axios.get(apiCall).then(
        async (response) => {
            let solarRadiation = response.data.observations[0].solarRadiation;
            let color = await helpers.colormapSolarRadiation(solarRadiation);
            console.log("solarRadiation: " + solarRadiation);
            console.log("color: " + color);
        
            let answer = {
                "value": solarRadiation + "watt/m^2",
                "color": color
            }
        
            return res.json({
                status: 200, message: '1', result: JSON.stringify(answer)
            });
        },
        (error) => {
          return res.json({ status: 400, message: 'Could not fetch solarRadiation from weather api!', error });
        }
        );  
};

export default {
    getAirtemp,
    getHumidity,
    getWindSpeed,
    getWindDir,
    getPressure,
    getPrecipTotal,
    getPrecipRate,
    getUV,
    getSolarRadiation
}
