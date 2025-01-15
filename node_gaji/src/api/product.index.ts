import express from "express";
import { getProductListCtrl } from './controller/productlist.ctrl';

const router = express.Router();


router.get('/list', getProductListCtrl)

export default router;