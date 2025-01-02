import express from "express";
import { sendProductData } from "./product.api";

const router = express.Router();

router.get('/', sendProductData)

export default router;