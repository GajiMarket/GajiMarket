import ctrl from './email.auth.ctrl';
import express from 'express';

const router = express.Router();

router.post('/accountAuthEmail', ctrl.accountAuthEmail);


export default router;

