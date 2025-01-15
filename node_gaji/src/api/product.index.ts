import express from "express";
import { getProductListCtrl } from './controller/productlist.ctrl';
// import { productDetail } from "./controller/productDetail.ctrl";

const router = express.Router();


router.get('/list', getProductListCtrl)


// router.get('/detail', productDetail);

export default router;