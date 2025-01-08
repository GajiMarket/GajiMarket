import { Router } from 'express';
import { getMessages, sendMessage } from '../api/controller/chat.message.ctrl';

const router = Router();

router.get('/:userId1/:userId2', getMessages);
router.post('/', sendMessage);

export default router;