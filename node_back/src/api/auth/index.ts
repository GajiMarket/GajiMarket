import ctrl from './email.auth.ctrl'
import express from 'express'

const router = express.Router();

router.post('/emailSend', ctrl.accountAuthEmail)

export default router;