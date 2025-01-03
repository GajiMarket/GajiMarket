import express from "express";
import { getProducts } from "./DAO/productPath.dao";

const router = express.Router();

router.get('/', getProducts)

export default router;