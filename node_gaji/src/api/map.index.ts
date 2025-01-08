import express from "express";
import { Product_preview } from "./DAO/Product_preview.dao";

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const product = await Product_preview(); // 비동기 함수 호출
        res.json(product); // 결과를 JSON 형식으로 응답
    } catch (error) {
        next(error); // 에러를 Express 에러 핸들러로 전달
    }
});

export default router;