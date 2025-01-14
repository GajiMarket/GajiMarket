import { Router } from 'express';
import { getChatRoomsByMember } from './controller/chat.ctrl';

const router = Router();

router.get('/chatrooms/:memberNo', getChatRoomsByMember);

export default router;