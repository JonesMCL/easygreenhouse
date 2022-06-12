import { Router } from 'express'
import sensorCtrl from '../controllers/sensordataCurrent'

const router = Router()


//TODO: AKTUALISIEREN
//router.route('/sensordata/airtempCurrent')
  /** GET /api/users/:userId - Get single */
//  .get(userCtrl.getUser)

router.route('/sensordataCurrent/getAverageSoiltemp')
  /** GET /api/sensordata/getAverageSoiltempCurrent - Get average soil temperature */
  .get(sensorCtrl.getAverageSoiltemp)

//router.route('/sensordata/getSplitSoiltempCurrent')

router.route('/sensordataCurrent/getAverageAirtemp')
  /** GET /api/sensordata/getAverageAirtempCurrent - Get average air temperature */
  .get(sensorCtrl.getAverageAirtemp)

  
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