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
    let AverageSoiltemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoiltemp")
    .then((response)=>{
        AverageSoiltemp = response.data.result;
        document.getElementById('AverageSoiltemp').innerHTML = AverageSoiltemp;
    })
    setTimeout("loadAverageSoiltemp();",5000);
}
function loadSplitSoiltemp(){
    let SplitSoiltemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitSoiltemp")
    .then((response)=>{
        SplitSoiltemp = response.data.result;
        document.getElementById('SplitSoiltemp').innerHTML = SplitSoiltemp;
    })
    setTimeout("loadSplitSoiltemp();",5000);
}
function loadAverageSoilMoist(){
    let AverageSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoilMoist")
    .then((response)=>{
        AverageSoilMoist = response.data.result;
        document.getElementById('AverageSoilMoist').innerHTML = AverageSoilMoist;
    })
    setTimeout("loadAverageSoilMoist();",5000);
}
function loadSplitSoilMoist(){
    let SplitSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitSoilMoist")
    .then((response)=>{
        SplitSoilMoist = response.data.result;
        document.getElementById('SplitSoilMoist').innerHTML = SplitSoilMoist;
    })
    setTimeout("loadSplitSoilMoist();",5000);
}
function loadAverageAirtemp(){
    let AverageAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageAirtemp")
    .then((response)=>{
        AverageAirtemp = response.data.result;
        document.getElementById('AverageAirtemp').innerHTML = AverageAirtemp;
    })
    setTimeout("loadAverageAirtemp();",5000);
}
function loadSplitAirtemp(){
    let SplitAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitAirtemp")
    .then((response)=>{
        SplitAirtemp = response.data.result;
        document.getElementById('SplitAirtemp').innerHTML = SplitAirtemp;
    })
    setTimeout("loadSplitAirtemp();",5000);
}
function loadAverageHumidity(){
    let AverageHumidity;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageHumidity")
    .then((response)=>{
        AverageHumidity = response.data.result;
        document.getElementById('AverageHumidity').innerHTML = AverageHumidity;
    })
    setTimeout("loadAverageHumidity();",5000);
}
function loadSplitHumidity(){
    let SplitHumidity;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getSplitHumidity")
    .then((response)=>{
        SplitHumidity = response.data.result;
        document.getElementById('SplitHumidity').innerHTML = SplitHumidity;
    })
    setTimeout("loadSplitHumidity();",5000);
}