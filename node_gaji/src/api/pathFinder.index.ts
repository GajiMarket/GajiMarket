import express from "express";
import { postPathCtrl, getPathCtrl } from "./controller/productPath.ctrl";

const router = express.Router();

router.post('/', postPathCtrl)
router.get('/', getPathCtrl)

export default router