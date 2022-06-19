import { Router } from 'express'
import sensorCtrl from '../controllers/sensordataHistory'

const router = Router()

router.route('/sensordataHistory/getAverageSoiltemp')
  /** GET /api/sensordataHistory/getAverageSoiltemp - Get average soil temperature from the last 12 months */
  .get(sensorCtrl.getAverageSoiltemp)


export default router