import express from "express";
import { getSellHistory, updateSellStatus } from "./controller/mypage_sell.ctrl";

const router = express.Router();


router.get("/:member_no", getSellHistory);


router.patch("/:product_id", updateSellStatus);

export default router;
