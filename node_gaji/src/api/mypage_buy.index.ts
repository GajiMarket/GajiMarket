import express from "express";
import { getMypageBuy } from "./controller/mypage_buy.ctrl"; // 이름 수정: getBuyHistory -> getMypageBuy

const router = express.Router();


router.get("/:member_no", getMypageBuy);

export default router;
