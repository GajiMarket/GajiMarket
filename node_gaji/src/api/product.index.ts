import express from "express";
import { getProducts } from './DAO/product.dao';
import { getProductListCtrl } from './controller/productlist.ctrl';

const router = express.Router();

router.get('/', getProducts);

router.get('/list', getProductListCtrl)

export default router;