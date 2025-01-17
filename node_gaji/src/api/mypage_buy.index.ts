import express from "express";
import { getMypageBuy } from "./controller/mypage_buy.ctrl"; // 이름 수정: getBuyHistory -> getMypageBuy

const router = express.Router();

// 구매내역 가져오기
router.get("/:member_no", getMypageBuy);

export default router;
