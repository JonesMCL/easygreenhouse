import { Router } from 'express'
import sensorCtrl from '../controllers/sensordataHistory'

const router = Router()

router.route('/sensordataHistory/getAverageSoiltemp')
  /** GET /api/sensordataHistory/getAverageSoiltemp - Get average soil temperature from the last 12 months */
  .get(sensorCtrl.getAverageSoiltemp)

  
router.route('/sensordataHistory/getAverageAirtemp')
  /** GET /api/sensordataHistory/getAverageAirtemp - Get average air temperature from the last 12 months */
  .get(sensorCtrl.getAverageAirtemp)

router.route('/sensordataHistory/getAverageSoilMoist')
  /** GET /api/sensordataHistory/getAverageSoilMoist - Get average soil moist from the last 12 months */
  .get(sensorCtrl.getAverageSoilMoist)

router.route('/sensordataHistory/getAverageHumidity')
  /** GET /api/sensordataHistory/getAverageHumidity - Get average humidity from the last 12 months */
  .get(sensorCtrl.getAverageHumidity)

router.route('/sensordataHistory/getAverageSoiltempMonthly')
  /** GET /api/sensordataHistory/getAverageSoiltempMonthly - Get average soil temperature separated by month from the last 12 months */
  .get(sensorCtrl.getAverageSoiltempMonthly)

router.route('/sensordataHistory/getAverageAirtempMonthly')
  /** GET /api/sensordataHistory/getAverageAirtempMonthly - Get average air temperature separated by month from the last 12 months */
  .get(sensorCtrl.getAverageAirtempMonthly)

router.route('/sensordataHistory/getAverageSoilMoistMonthly')
  /** GET /api/sensordataHistory/getAverageSoilMoistMonthly - Get average soil moisture separated by month from the last 12 months */
  .get(sensorCtrl.getAverageSoilMoistMonthly)

router.route('/sensordataHistory/getAverageHumidityMonthly')
  /** GET /api/sensordataHistory/getAverageHumidityMonthly - Get average humidity separated by month from the last 12 months */
  .get(sensorCtrl.getAverageHumidityMonthly)

export default router