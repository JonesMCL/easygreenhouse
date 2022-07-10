window.onload = function(){
    loadAverageSoiltemp();
    loadSplitSoiltemp();
    loadAverageSoilMoist();
    loadSplitSoilMoist();
    loadAverageAirtemp();
    loadSplitAirtemp();
    loadAverageHumidity();
    loadSplitHumidity();
};

function loadAverageSoiltemp(){
    let averageSoiltemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoiltemp")
    .then((response)=>{
        averageSoiltemp = response.data.result;
        document.getElementById('averageSoiltemp').innerHTML = averageSoiltemp;
    })
    setTimeout("loadAverageSoiltemp();",5000);
}
function loadSplitSoiltemp(){
    let splitSoiltemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitSoiltemp")
    .then((response)=>{
        splitSoiltemp = response.data.result;
        document.getElementById('splitSoiltemp').innerHTML = splitSoiltemp;
    })
    setTimeout("loadSplitSoiltemp();",5000);
}
function loadAverageSoilMoist(){
    let averageSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoilMoist")
    .then((response)=>{
        averageSoilMoist = response.data.result;
        document.getElementById('averageSoilMoist').innerHTML = averageSoilMoist;
    })
    setTimeout("loadAverageSoilMoist();",5000);
}
function loadSplitSoilMoist(){
    let splitSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitSoilMoist")
    .then((response)=>{
        splitSoilMoist = response.data.result;
        document.getElementById('splitSoilMoist').innerHTML = splitSoilMoist;
    })
    setTimeout("loadSplitSoilMoist();",5000);
}
function loadAverageAirtemp(){
    let averageAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageAirtemp")
    .then((response)=>{
        averageAirtemp = response.data.result;
        document.getElementById('averageAirtemp').innerHTML = averageAirtemp;
    })
    setTimeout("loadAverageAirtemp();",5000);
}
function loadSplitAirtemp(){
    let splitAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitAirtemp")
    .then((response)=>{
        splitAirtemp = response.data.result;
        document.getElementById('splitAirtemp').innerHTML = splitAirtemp;
    })
    setTimeout("loadSplitAirtemp();",5000);
}
function loadAverageHumidity(){
    let averageHumidity;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageHumidity")
    .then((response)=>{
        averageHumidity = response.data.result;
        document.getElementById('averageHumidity').innerHTML = averageHumidity;
    })
    setTimeout("loadAverageHumidity();",5000);
}
function loadSplitHumidity(){
    let splitHumidity;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitHumidity")
    .then((response)=>{
        splitHumidity = response.data.result;
        document.getElementById('splitHumidity').innerHTML = splitHumidity;
    })
    setTimeout("loadSplitHumidity();",5000);
}