/**
 * @return "0" or "1"
 * "0", if other users have registered before, "1", if this is the first registration
 */
async function checkFirstRegistration () {
    let key = "admin:Users";
  
    client.exists(key, (err, reply) => {
      if (reply === 1) {
        return 0; //other users already registered
      }
      else{
        return 1; //first registration
      }
    });
};

function degToCompass(num){
    let val = parseInt((num/22.5)+.5);
    let arr = ['N','NNE','NE','ENE','E','ESE', 'SE', 'SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    let res = arr[(val % 16)];
      
    return new Promise((resolve,reject)=>{
        resolve(res);
        reject(new Error("Could not transform winddirection from degree to compass"));
    });
};

function colormapTemp(num){
  let color;
  if (num < 0){
    color = 'red';
  }
  else if (num >= 0 && num <= 8){
     color = 'orange';
  }
  else if (num > 8 && num <= 15){
    color = 'yellow';
  }
  else if (num > 15 && num <= 26){
    color = 'green';
  }
  else if (num > 26 && num <= 30){
    color = 'yellow';
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
    color = 'yellow';
  }
  else if (num > 45 && num <= 70){
    color = 'green';
  }
  else if (num > 70 && num <= 80){
    color = 'green-yellow';
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
    color = 'yellow';
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
    color = 'yellow';
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
    checkFirstRegistration,
    degToCompass,
    colormapTemp,
    colormapMoisture,
    colormapUV,
    colormapSolarRadiation
}