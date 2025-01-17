import express from "express";
import { getBuyHistory } from "./controller/mypage_buy.ctrl";

const router = express.Router();

// 구매내역 가져오기
router.get("/:member_no", getBuyHistory);

export default router;
