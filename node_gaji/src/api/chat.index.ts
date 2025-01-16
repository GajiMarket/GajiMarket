import { Router } from 'express';
import { getChatRoomsByMember, getProductById } from './controller/chat.ctrl';

const router = Router();

router.get('/chatrooms/:memberNo', getChatRoomsByMember);
router.get('/product/:productId', getProductById);

export default router;