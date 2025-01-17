import express from "express";
import { getMypageLove, deleteMypageLoveItem } from "./controller/mypage_love.ctrl";

const router = express.Router();

// 관심목록 가져오기
router.get("/:member_no", getMypageLove);

// 관심목록에서 항목 삭제
router.delete("/:product_id/:member_no", deleteMypageLoveItem);

export default router;
