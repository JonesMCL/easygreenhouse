import { Router } from 'express'
import sensorCtrl from '../controllers/sensordataCurrent'

const router = Router()

router.route('/sensordataCurrent/getAverageSoiltemp')
  /** GET /api/sensordata/getAverageSoiltemp - Get average soil temperature */
  .get(sensorCtrl.getAverageSoiltemp)

router.route('/sensordataCurrent/getSplitSoiltemp')
  /** GET /api/sensordata/getSplitSoiltemp - Get single sensor soil temperatures */
  .get(sensorCtrl.getSplitSoiltemp)

router.route('/sensordataCurrent/getAverageAirtemp')
  /** GET /api/sensordata/getAverageAirtemp - Get average air temperature */
  .get(sensorCtrl.getAverageAirtemp)

router.route('/sensordataCurrent/getSplitAirtemp')
  /** GET /api/sensordata/getSplitAirtemp - Get single sensor air temperatures */
  .get(sensorCtrl.getSplitAirtemp)

router.route('/sensordataCurrent/getAverageSoilMoist')
  /** GET /api/sensordata/getAverageSoiltemp - Get average soil moisture value */
  .get(sensorCtrl.getAverageSoilMoist)

router.route('/sensordataCurrent/getSplitSoilMoist')
  /** GET /api/sensordata/getSplitSoilMoist - Get single sensor soil moisture values */
  .get(sensorCtrl.getSplitSoilMoist)

router.route('/sensordataCurrent/getAverageHumidity')
  /** GET /api/sensordata/getAverageHumidity - Get average humidity */
  .get(sensorCtrl.getAverageHumidity)

router.route('/sensordataCurrent/getSplitHumidity')
  /** GET /api/sensordata/getSingleHumidity - Get single sensor humidities */
  .get(sensorCtrl.getSplitHumidity)

  
//EXAMPLES: 
//router.route('/users/update')
  /** PUT /api/users/update - Update single user */
//  .put(userCtrl.updateUser)

//router.route('/users/:userId')
  /** GET /api/users/:userId - Get single user */
//  .get(userCtrl.getUser)

//router.route('/users/:userId')
  /** DELETE /api/users/delete - Delete single user */
//  .delete(userCtrl.deleteUser)

export default router