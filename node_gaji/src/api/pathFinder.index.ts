import express from "express";
import { postPathCtrl } from "./controller/productPath.ctrl";

const router = express.Router();

router.post('/', postPathCtrl)
router.get('/', postPathCtrl)

export default router