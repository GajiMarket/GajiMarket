import { Router } from 'express';
import { getChatRooms, getChatProduct } from './controller/chat.ctrl';

const router = Router();

router.get('/chatrooms/:memberNo', getChatRooms);
router.get('/product/:productId', getChatProduct);

export default router;