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

export default {
    checkFirstRegistration
}