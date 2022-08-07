window.onload = function(){
    loadAirtemp();
    loadAirHumidity();
    loadWindSpeed();
    loadWindDir();
    loadAirPressure();
    loadPrecipTotal();
    loadPrecipRate();
    loadUV();
    loadSolarRadiation();
};

function loadAirtemp(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getAirtemp")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let airtemp = JSON.parse(replaced)
        document.getElementById('Airtemp').innerHTML = airtemp.value
        document.getElementById('Airtemp').style.color = airtemp.color
    })
    setTimeout("loadAirtemp();",5000);
}
function loadAirHumidity(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getHumidity")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let humidity = JSON.parse(replaced)
        document.getElementById('Humidity').innerHTML = humidity.value
        document.getElementById('Humidity').style.color = humidity.color
    })
    setTimeout("loadAirHumidity();",5000);
}
function loadWindSpeed(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getWindSpeed")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let windSpeed = JSON.parse(replaced)
        document.getElementById('WindSpeed').innerHTML = windSpeed.value
        document.getElementById('WindSpeed').style.color = windSpeed.color
    })
    setTimeout("loadWindSpeed();",5000);
}
function loadWindDir(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getWindDir")
    .then((response)=>{
        let windDir = response.data.result;
        document.getElementById('WindDir').innerHTML = windDir;
    })
    setTimeout("loadWindDir();",5000);
}
function loadAirPressure(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPressure")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let pressure = JSON.parse(replaced)
        document.getElementById('Pressure').innerHTML = pressure.value
        document.getElementById('Pressure').style.color = pressure.color
    })
    setTimeout("loadPressure();",5000);
}
function loadPrecipTotal(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPrecipTotal")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let precipTotal = JSON.parse(replaced)
        document.getElementById('PrecipTotal').innerHTML = precipTotal.value
        document.getElementById('PrecipTotal').style.color = precipTotal.color
    })
    setTimeout("loadPrecipTotal();",5000);
}
function loadPrecipRate(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPrecipRate")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let precipRate = JSON.parse(replaced)
        document.getElementById('PrecipRate').innerHTML = precipRate.value
        document.getElementById('PrecipRate').style.color = precipRate.color
    })
    setTimeout("loadPrecipRate();",5000);
}
function loadUV(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getUV")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let uV = JSON.parse(replaced)
        document.getElementById('UV').innerHTML = uV.value
        document.getElementById('UV').style.color = uV.color
    })
    setTimeout("loadUV();",5000);
}
function loadSolarRadiation(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getSolarRadiation")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let solarRadiation = JSON.parse(replaced)
        document.getElementById('SolarRadiation').innerHTML = solarRadiation.value
        document.getElementById('SolarRadiation').style.color = solarRadiation.color
    })
    setTimeout("loadSolarRadiation();",5000);
}