import express from 'express';
import {accountAuthEmail} from './controller/email.auth.ctrl';
import {signCtrl, userCtrl} from './controller/member.auth.ctrl';

const router = express.Router();

router.post('/accountAuthEmail', accountAuthEmail);
router.post('/signup', signCtrl);
router.post('/login', userCtrl);


export default router;

