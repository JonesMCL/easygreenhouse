window.onload = function(){
    loadAverageSoiltemp();
    loadAverageSoilMoist();
    loadHistoryAverageSoiltemp();
    loadHistoryAverageSoilMoist();
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
function loadAverageSoilMoist(){
    let averageSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataCurrent/getAverageSoilMoist")
    .then((response)=>{
        averageSoilMoist = response.data.result;
        document.getElementById('averageSoilMoist').innerHTML = averageSoilMoist;
    })
    setTimeout("loadAverageSoilMoist();",5000);
}
function loadHistoryAverageSoiltemp(){
    let historyAverageSoiltemp;
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageSoiltemp")
    .then((response)=>{
        historyAverageSoiltemp = response.data.result;
        document.getElementById('historyAverageSoiltemp').innerHTML = historyAverageSoiltemp;
    })
    setTimeout("loadHistoryAverageSoiltemp();",5000);
}
function loadHistoryAverageSoilMoist(){
    let historyAverageSoilMoist;
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageSoilMoist")
    .then((response)=>{
        historyAverageSoilMoist = response.data.result;
        document.getElementById('historyAverageSoilMoist').innerHTML = historyAverageSoilMoist;
    })
    setTimeout("loadHistoryAverageSoilMoist();",5000);
}