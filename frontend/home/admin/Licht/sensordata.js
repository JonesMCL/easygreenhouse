window.onload = function(){
    loadUV();
    loadSolarRadiation();
};

function loadUV(){
    let uv;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getUV")
    .then((response)=>{
        uv = response.data.result;
        document.getElementById('uv').innerHTML = uv;
    })
    setTimeout("uv();",5000);
}
function loadSolarRadiation(){
    let solarRadiation;
    axios.get("http://0.0.0.0:4000/api/weatherdataCurrent/getSolarRadiation")
    .then((response)=>{
        solarRadiation = response.data.result;
        document.getElementById('solarRadiation').innerHTML = solarRadiation;
    })
    setTimeout("loadsolarRadiation();",5000);
}