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

export default {
    checkFirstRegistration,
    degToCompass
}
