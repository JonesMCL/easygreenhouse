import { Router } from 'express'
import sensorCtrl from '../controllers/sensordataCurrent'

const router = Router()

router.route('/sensordataCurrent/getAverageSoiltemp')
  /** GET /api/sensordataCurrent/getAverageSoiltemp - Get average soil temperature */
  .get(sensorCtrl.getAverageSoiltemp)

router.route('/sensordataCurrent/getSplitSoiltemp')
  /** GET /api/sensordataCurrent/getSplitSoiltemp - Get single sensor soil temperatures */
  .get(sensorCtrl.getSplitSoiltemp)

router.route('/sensordataCurrent/getAverageAirtemp')
  /** GET /api/sensordataCurrent/getAverageAirtemp - Get average air temperature */
  .get(sensorCtrl.getAverageAirtemp)

router.route('/sensordataCurrent/getSplitAirtemp')
  /** GET /api/sensordataCurrent/getSplitAirtemp - Get single sensor air temperatures */
  .get(sensorCtrl.getSplitAirtemp)

router.route('/sensordataCurrent/getAverageSoilMoist')
  /** GET /api/sensordataCurrent/getAverageSoiltemp - Get average soil moisture value */
  .get(sensorCtrl.getAverageSoilMoist)

router.route('/sensordataCurrent/getSplitSoilMoist')
  /** GET /api/sensordataCurrent/getSplitSoilMoist - Get single sensor soil moisture values */
  .get(sensorCtrl.getSplitSoilMoist)

router.route('/sensordataCurrent/getAverageHumidity')
  /** GET /api/sensordataCurrent/getAverageHumidity - Get average humidity */
  .get(sensorCtrl.getAverageHumidity)

router.route('/sensordataCurrent/getSplitHumidity')
  /** GET /api/sensordataCurrent/getSingleHumidity - Get single sensor humidities */
  .get(sensorCtrl.getSplitHumidity)

export default router