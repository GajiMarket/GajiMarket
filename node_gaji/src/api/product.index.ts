import express from "express";
import { sendProductData } from "./service/product.api";

const router = express.Router();

router.get('/', sendProductData)

export default router;