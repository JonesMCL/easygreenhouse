window.onload = function(){
    loadAverageSoiltemp();
    loadAverageSoilMoist();
    loadHistoryAverageSoiltemp();
    loadHistoryAverageSoilMoist();
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

function loadHistoryAverageSoiltemp(){
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageSoiltemp")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let historyAverageSoiltemp = JSON.parse(replaced)
        document.getElementById('historyAverageSoiltemp').innerHTML = historyAverageSoiltemp.value
        document.getElementById('historyAverageSoiltemp').style.color = historyAverageSoiltemp.color
    })
    setTimeout("loadHistoryAverageSoiltemp();",5000);
}

function loadHistoryAverageSoilMoist(){
    axios.get("http://0.0.0.0:4000/api/sensordataHistory/getAverageSoilMoist")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let historyAverageSoilMoist = JSON.parse(replaced)
        document.getElementById('historyAverageSoilMoist').innerHTML = historyAverageSoilMoist.value
        document.getElementById('historyAverageSoilMoist').style.color = historyAverageSoilMoist.color
    })
    setTimeout("loadHistoryAverageSoilMoist();",5000);
}