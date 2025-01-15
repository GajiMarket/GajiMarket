import { Router } from 'express';
import { getChatRoomsByMember, getProductByMember } from './controller/chat.ctrl';

const router = Router();

router.get('/chatrooms/:memberNo', getChatRoomsByMember);
router.get('/product/:memberNo', getProductByMember);

export default router;