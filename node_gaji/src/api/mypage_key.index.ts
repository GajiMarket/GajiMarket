import express from "express";
import { keywordCtrl, getKeywords, deleteKeywords } from "./controller/mypage_key.ctrl";

const router = express.Router();


router.post("/", keywordCtrl);


router.get("/:id", getKeywords);


router.delete("/", deleteKeywords);

export default router;
