import express from "express";
import { productPathCtrl } from "./controller/productPath.ctrl";

const router = express.Router();

router.post('/', productPathCtrl)

export default router