window.onload = function(){
    loadAverageSoiltemp();
    loadAverageSoilMoist();
    loadAverageAirtemp();
    loadAverageHumidity();
    loadUV();
    loadSolarRadiation();
};

function loadAverageSoiltemp(){
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoiltemp")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let averageSoiltemp = JSON.parse(replaced)
        document.getElementById('averageSoiltemp').innerHTML = averageSoiltemp.value
        document.getElementById('averageSoiltemp').style.color = averageSoiltemp.color
    })
    setTimeout("loadAverageSoiltemp();",5000);
}

function loadAverageSoilMoist(){
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoilMoist")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let averageSoilMoist = JSON.parse(replaced)
        document.getElementById('averageSoilMoist').innerHTML = averageSoilMoist.value
        document.getElementById('averageSoilMoist').style.color = averageSoilMoist.color
    })
    setTimeout("loadAverageSoilMoist();",5000);
}

function loadAverageAirtemp(){
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageAirtemp")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let averageAirtemp = JSON.parse(replaced)
        document.getElementById('averageAirtemp').innerHTML = averageAirtemp.value
        document.getElementById('averageAirtemp').style.color = averageAirtemp.color
    })
    setTimeout("loadAverageAirtemp();",5000);
}

function loadAverageHumidity(){
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageHumidity")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let averageHumidity = JSON.parse(replaced)
        document.getElementById('averageHumidity').innerHTML = averageHumidity.value
        document.getElementById('averageHumidity').style.color = averageHumidity.color
    })
    setTimeout("loadAverageHumidity();",5000);
}

function loadUV(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getUV")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let uv = JSON.parse(replaced)
        document.getElementById('lightcurrent').innerHTML = uv.value
        document.getElementById('lightcurrent').style.color = uv.color
    })
    setTimeout("uv();",5000);
}

function loadSolarRadiation(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getSolarRadiation")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let watt = JSON.parse(replaced)
        document.getElementById('wattscurrent').innerHTML = watt.value
        document.getElementById('wattscurrent').style.color = watt.color
    })
    setTimeout("loadsolarRadiation();",5000);
}
