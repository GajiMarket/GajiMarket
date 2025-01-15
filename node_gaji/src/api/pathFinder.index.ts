import express from "express";
import { postPathCtrl } from "./controller/productPath.ctrl";

const router = express.Router();

router.post('/', postPathCtrl)

export default router