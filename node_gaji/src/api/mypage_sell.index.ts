import express from "express";
import { getSellHistory, updateSellStatus } from "./controller/mypage_sell.ctrl";

const router = express.Router();

// 판매내역 가져오기
router.get("/:member_no", getSellHistory);

// 판매 상태 업데이트
router.patch("/:product_id", updateSellStatus);

export default router;
