import { Router } from 'express'
import users from './user'

const router = Router()

router.use(users)

export default router