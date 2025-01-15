import express from 'express';
import multer from 'multer';
import { uploadImage } from './controller/mypage.ctrl';

const upload = multer({ storage: multer.memoryStorage()}); // 메모리에 파일 정장 (디스크저장 안함)

const router = express.Router();

//formData에서 설정한(formData.append(키, 값, 값)) 키값이랑 일치해야함
router.post('/uploadimage', upload.array('profileImage', 5), uploadImage.uploadFiles);
router.post('/defaultimage', uploadImage.defaultProfileImage);
router.post('/profileupdate', uploadImage.proifleNickname);

export default router;