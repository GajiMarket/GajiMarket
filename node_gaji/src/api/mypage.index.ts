import express from 'express';
import multer from 'multer';
import { uploadImage } from './controller/mypage.ctrl';

const upload = multer({ storage: multer.memoryStorage()}); // 메모리에 파일 정장 (디스크저장 안함)

const router = express.Router();

router.post('/profileimage', upload.array('files', 5), uploadImage.uploadFiles);

export default router;