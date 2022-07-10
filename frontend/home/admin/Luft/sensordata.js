window.onload = function(){
    loadAverageAirtemp();
    loadAverageHumidity();
    loadHistoryAverageAirtemp();
    loadHistoryAverageHumidity();
};

function loadAverageAirtemp(){
    let averageAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageAirtemp")
    .then((response)=>{
        averageAirtemp = response.data.result;
        document.getElementById('averageAirtemp').innerHTML = averageAirtemp;
    })
    setTimeout("loadAverageAirtemp();",5000);
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
function loadHistoryAverageAirtemp(){
    let historyAverageAirtemp;
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageAirtemp")
    .then((response)=>{
        historyAverageAirtemp = response.data.result;
        document.getElementById('historyAverageAirtemp').innerHTML = historyAverageAirtemp;
    })
    setTimeout("loadHistoryAverageAirtemp();",5000);
}
function loadHistoryAverageHumidity(){
    let historyAverageHumidity;
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageHumidity")
    .then((response)=>{
        historyAverageHumidity = response.data.result;
        document.getElementById('historyAverageHumidity').innerHTML = historyAverageHumidity;
    })
    setTimeout("loadHistoryAverageHumidity();",5000);
}