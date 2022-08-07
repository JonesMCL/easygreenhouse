window.onload = function(){
    loadAverageAirtemp();
    loadAverageHumidity();
    loadHistoryAverageAirtemp();
    loadHistoryAverageHumidity();
};

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
function loadHistoryAverageAirtemp(){
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageAirtemp")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let historyAverageAirtemp = JSON.parse(replaced)
        document.getElementById('historyAverageAirtemp').innerHTML = historyAverageAirtemp.value
        document.getElementById('historyAverageAirtemp').style.color = historyAverageAirtemp.color
    })
    setTimeout("loadHistoryAverageAirtemp();",5000);
}
function loadHistoryAverageHumidity(){
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageHumidity")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let historyAverageHumidity = JSON.parse(replaced)
        document.getElementById('historyAverageHumidity').innerHTML = historyAverageHumidity.value
        document.getElementById('historyAverageHumidity').style.color = historyAverageHumidity.color
    })
    setTimeout("loadHistoryAverageHumidity();",5000);
}