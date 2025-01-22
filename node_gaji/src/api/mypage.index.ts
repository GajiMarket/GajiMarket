import express from 'express';
import multer from 'multer';
import { uploadImage } from './controller/mypage.ctrl';

const upload = multer({ storage: multer.memoryStorage() }); // 메모리에 파일 저장 (디스크 저장 안함)

const router = express.Router();


router.post('/uploadimage', upload.array('profileImage', 5), uploadImage.uploadFiles);


router.post('/defaultimage', uploadImage.defaultProfileImage);


router.post('/profileupdate', uploadImage.proifleNickname);

export default router;
