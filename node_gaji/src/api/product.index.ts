import express from "express";
import { getProductListCtrl } from './controller/productlist.ctrl';
import { addProductCtrl } from './controller/product.ctrl';
// import { productDetail } from "./controller/productDetail.ctrl";

const router = express.Router();


router.get('/list', getProductListCtrl)

router.post('/', addProductCtrl);

// router.get('/detail', productDetail);

export default router;