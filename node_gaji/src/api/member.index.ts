import express from 'express';
import {accountAuthEmail} from './controller/email.auth.ctrl';
import {signCtrl, userCtrl, validateToken} from './controller/member.auth.ctrl';

const router = express.Router();

    router.post('/accountauthemail', accountAuthEmail);
    router.post('/signup', signCtrl);
    router.post('/login', userCtrl);
    router.get('/tokenvali', validateToken);


export default router;

