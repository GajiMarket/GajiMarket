import express from "express";
import { getProducts } from './DAO/product.dao';
import { getProductListCtrl } from './controller/productlist.ctrl';
import { addProductCtrl } from './controller/product.ctrl';

const router = express.Router();

router.get('/', getProducts);

router.get('/list', getProductListCtrl)

router.post('/', addProductCtrl);

export default router;