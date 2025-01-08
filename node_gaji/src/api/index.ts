import express from 'express';
import ctrl from './controller/email.auth.ctrl';

const router = express.Router();

router.post('/accountAuthEmail', ctrl.accountAuthEmail);


export default router;

