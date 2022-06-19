import { Router } from 'express'
//import users from './user'
//import auth from './auth'
import sensordataCurrent from './sensordataCurrent'
import weatherdataCurrent from './weatherdataCurrent'

const router = Router()

//router.use(users)
//router.use(auth)
router.use(sensordataCurrent)
router.use(weatherdataCurrent)

export default router