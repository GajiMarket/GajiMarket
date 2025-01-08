import express from 'express';
import {accountAuthEmail} from './controller/email.auth.ctrl';
import {signCtrl, userCtrl, validateToken, getLoginInfo} from './controller/member.auth.ctrl';

const router = express.Router();

    router.post('/accountauthemail', accountAuthEmail);
    router.post('/signup', signCtrl);
    router.post('/login', userCtrl);
    router.get('/tokenvali', validateToken);
    router.get('/getuserinfo', getLoginInfo)


export default router;

