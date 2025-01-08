import { Router } from 'express';
import { getUser } from './controller/chat.ctrl';

const router = Router();

router.get('/:id', getUser);

export default router;