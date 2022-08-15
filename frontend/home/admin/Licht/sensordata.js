window.onload = function(){
    loadUV();
    loadSolarRadiation();
};

function loadUV(){
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getUV")
    .then((response)=>{
        responseCutBackslash = response.data.result.toString().replace(/\\/g, '')
        const char = responseCutBackslash[0];
        let replaced = responseCutBackslash.replace(char, "{")
        replaced = replaced.replace(/.$/,"}")
        let uV = JSON.parse(replaced)
        document.getElementById('uv').innerHTML = uV.value
        document.getElementById('uv').style.color = uV.color
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
        document.getElementById('solarRadiation').innerHTML = solarRadiation.value
        document.getElementById('solarRadiation').style.color = solarRadiation.color
    })
    setTimeout("loadSolarRadiation();",5000);
}
