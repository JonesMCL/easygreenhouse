import { Router } from 'express'
import users from './user'
import auth from './auth'

const router = Router()

router.use(users)
router.use(auth)

export default router