import express from 'express';
import {accountAuthEmail, emailCheck} from './controller/email.auth.ctrl';
import {signCtrl, userCtrl, validateToken, getLoginInfo, duplicatedId} from './controller/member.auth.ctrl';

const router = express.Router();


    router.post('/emailSend', accountAuthEmail);
   
    router.post('/emailcheck', emailCheck);
   
    router.post('/signup', signCtrl);

    router.post('/login', userCtrl);

    router.get('/tokenvali', validateToken);

    router.get('/getuserinfo', getLoginInfo);

    router.post('/validateId', duplicatedId);


export default router;

