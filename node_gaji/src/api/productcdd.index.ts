import express from "express";
import { productaddCtrl } from "./controller/productadd.ctrl";

const router = express.Router();

router.post('/', productaddCtrl);

export default router;