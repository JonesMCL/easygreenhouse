import { Router } from 'express'
import weatherCtrl from '../controllers/weatherdataCurrent'

const router = Router()

router.route('/weatherdataCurrent/getAirtemp')
  /** GET /api/sensordata/getAirtemp - Get outside air temperature */
  .get(weatherCtrl.getAirtemp)

router.route('/weatherdataCurrent/getHumidity')
  /** GET /api/sensordata/getHumidity - Get outside humidity */
  .get(weatherCtrl.getHumidity)

router.route('/weatherdataCurrent/getWindSpeed')
  /** GET /api/sensordata/getWindSpeed - Get outside wind speed */
  .get(weatherCtrl.getWindSpeed)

router.route('/weatherdataCurrent/getWindDir')
  /** GET /api/sensordata/getWindDir - Get outside wind direction */
  .get(weatherCtrl.getWindDir)

router.route('/weatherdataCurrent/getPressure')
  /** GET /api/sensordata/getPressure - Get outside pressure */
  .get(weatherCtrl.getPressure)

router.route('/weatherdataCurrent/getPrecipTotal')
  /** GET /api/sensordata/getPrecipTotal - Get outside rain amount in mm */
  .get(weatherCtrl.getPrecipTotal)

router.route('/weatherdataCurrent/getPrecipRate')
  /** GET /api/sensordata/getPrecipRate - Get outside rain amount in mm/hr */
  .get(weatherCtrl.getPrecipRate)

router.route('/weatherdataCurrent/getUV')
  /** GET /api/sensordata/getUV - Get outside UV index */
  .get(weatherCtrl.getUV)

router.route('/weatherdataCurrent/getSolarRadiation')
  /** GET /api/sensordata/getSolarRadiation - Get outside SolarRadiation amount in w/m2 */
  .get(weatherCtrl.getSolarRadiation)

export default router
