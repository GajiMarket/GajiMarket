import express from "express";
import { productaddCtrl } from "./controller/productadd.ctrl";

const router = express.Router();

router.post('/productadd', productaddCtrl);

export default router;