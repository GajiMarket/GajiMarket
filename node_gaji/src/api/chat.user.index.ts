import { Router } from 'express';
import { getUser } from '../api/controller/chat.user.ctrl';

const router = Router();

router.get('/:id', getUser);

export default router;