import express from "express";
import { getProductListCtrl } from "./controller/productlist.ctrl"; // 컨트롤러 가져오기

const router = express.Router();

// 제품 목록 가져오기 라우터
router.get("/product/list", getProductListCtrl);

export default router;
