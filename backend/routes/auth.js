import { Router } from 'express'
import authCtrl from '../controllers/auth'

const router = Router()

router.route('/users/add')
  /** PUT /api/users/add - Add single user */
  .put(userCtrl.addUser)
  
router.route('/users/update')
  /** PUT /api/users/update - Update single user */
  .put(userCtrl.updateUser)

router.route('/users/:userId')
  /** GET /api/users/:userId - Get single user */
  .get(userCtrl.getUser)

router.route('/users/:userId')
  /** DELETE /api/users/delete - Delete single user */
  .delete(userCtrl.deleteUser)

export default router