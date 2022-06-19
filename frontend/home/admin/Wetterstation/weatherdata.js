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
    let Airtemp;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getAirtemp")
    .then((response)=>{
        Airtemp = response.data.result;
        document.getElementById('Airtemp').innerHTML = Airtemp;
    })
    setTimeout("loadAirtemp();",5000);
}
function loadAirHumidity(){
    let Humidity;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getHumidity")
    .then((response)=>{
        Humidity = response.data.result;
        document.getElementById('Humidity').innerHTML = Humidity;
    })
    setTimeout("loadAirhumid();",5000);
}
function loadWindSpeed(){
    let WindSpeed;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getWindSpeed")
    .then((response)=>{
        WindSpeed = response.data.result;
        document.getElementById('WindSpeed').innerHTML = WindSpeed;
    })
    setTimeout("loadWindSpeed();",5000);
}
function loadWindDir(){
    let WindDir;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getWindDir")
    .then((response)=>{
        WindDir = response.data.result;
        document.getElementById('WindDir').innerHTML = WindDir;
    })
    setTimeout("loadWindDir();",5000);
}
function loadAirPressure(){
    let Pressure;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPressure")
    .then((response)=>{
        Pressure = response.data.result;
        document.getElementById('Pressure').innerHTML = Pressure;
    })
    setTimeout("loadPressure();",5000);
}
function loadPrecipTotal(){
    let PrecipTotal;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPrecipTotal")
    .then((response)=>{
        PrecipTotal = response.data.result;
        document.getElementById('PrecipTotal').innerHTML = PrecipTotal;
    })
    setTimeout("loadPrecipTotal();",5000);
}
function loadPrecipRate(){
    let PrecipRate;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getPrecipRate")
    .then((response)=>{
        PrecipRate = response.data.result;
        document.getElementById('PrecipRate').innerHTML = PrecipRate;
    })
    setTimeout("loadPrecipRate();",5000);
}
function loadUV(){
    let UV;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getUV")
    .then((response)=>{
        UV = response.data.result;
        document.getElementById('UV').innerHTML = UV;
    })
    setTimeout("loadUV();",5000);
}
function loadSolarRadiation(){
    let SolarRadiation;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getSolarRadiation")
    .then((response)=>{
        SolarRadiation = response.data.result;
        document.getElementById('SolarRadiation').innerHTML = SolarRadiation;
    })
    setTimeout("loadSolarRadiation();",5000);
}