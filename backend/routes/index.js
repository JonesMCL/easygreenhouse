import { Router } from 'express'
//import users from './user'
//import auth from './auth'
import sensordataCurrent from './sensordataCurrent'

const router = Router()

//router.use(users)
//router.use(auth)
router.use(sensordataCurrent)

export default router