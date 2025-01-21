import express from "express";
import multer from 'multer'
import { productaddCtrl } from "./controller/productadd.ctrl";

const upload = multer({storage: multer.memoryStorage()});

const router = express.Router();

// router.post('/productadd', productaddCtrl);
router.post('/productadd', upload.array('productImages', 10), productaddCtrl);

export default router;