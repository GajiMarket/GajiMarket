import express from 'express';
import {accountAuthEmail} from './controller/email.auth.ctrl';
import {signCtrl, userCtrl, validateToken, getLoginInfo, duplicatedId} from './controller/member.auth.ctrl';

const router = express.Router();

    router.get('/emailSend', accountAuthEmail);
    router.post('/signup', signCtrl);
    router.post('/login', userCtrl);
    router.get('/tokenvali', validateToken);
    router.get('/getuserinfo', getLoginInfo);
    router.post('/validateId', duplicatedId);


export default router;

