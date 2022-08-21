function colormapTemp(num){
    let color;
    if (num < 0){
      color = 'red';
    }
    else if (num >= 0 && num <= 8){
       color = 'orange';
    }
    else if (num > 8 && num <= 15){
      color = '#FFDD00';
    }
    else if (num > 15 && num <= 26){
      color = 'green';
    }
    else if (num > 26 && num <= 30){
      color = '#FFDD00';
    }
    else if (num > 30 && num <= 35){
      color = 'orange';
    }
    else if (num > 35){
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for temperature"));
    });
};
  
function colormapMoisture(num){
    let color;
    if (num <= 15){
      color = 'red';
    }
    else if (num > 15 && num <= 25){
       color = 'orange';
    }
    else if (num > 25 && num <= 45){
      color = '#FFDD00';
    }
    else if (num > 45 && num <= 70){
      color = 'green';
    }
    else if (num > 70 && num <= 80){
      color = '#FFDD00';
    }
    else if (num > 80 && num <= 100){
      color = 'orange';
    }
    else{
      color = 'none';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
  function colormapUV(num){
    let color;
    if (num < 3){
      color = 'green';
    }
    else if (num >= 3 && num < 6){
      color = '#FFDD00';
    }
    else {
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
function colormapSolarRadiation(num){
    let color;
    if (num <= 299){
      color = 'green';
    }
    else if (num > 299 && num <= 599){
      color = '#FFDD00';
    }
    else {
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
function colormapWindSpeed(num){
    let color;
    if (num < 5){
      color = 'green';
    }
    else if (num >= 5 && num < 15){
      color = '#FFDD00';
    }
    else if (num >= 15 && num < 25){
      color = 'orange';
    }
    else {
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
function colormapPressure(num){
    let color;
    if (num >= 950 && num <= 1020){
      color = '#FFDD00';
    }
    else if (num > 1020 && num < 1050){
      color = 'green';
    }
    else {
      color = 'none';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
function colormapPreciptotal(num){
    let color;
    if (num >= 0 && num <= 4.5){
      color = 'green';
    }
    else if (num > 4.5 && num <= 10){
      color = '#FFDD00';
    }
    else {
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
function colormapPrecipRate(num){
    let color;
    if (num >= 0 && num <= 5){
      color = 'green';
    }
    else if (num > 5 && num <= 15){
      color = '#FFDD00';
    }
    else {
      color = 'red';
    }
      
    return new Promise((resolve,reject)=>{
        resolve(color);
        reject(new Error("Could not find a suitable color for moisture level"));
    });
};
  
export default {
    colormapTemp,
    colormapMoisture,
    colormapUV,
    colormapSolarRadiation,
    colormapWindSpeed,
    colormapPressure,
    colormapPreciptotal,
    colormapPrecipRate
}
