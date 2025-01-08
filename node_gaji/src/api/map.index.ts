import express from "express";
import { getProductPreviews } from "./DAO/Product_preview.dao";

const router = express.Router();

// 상품 미리보기 API
router.get('/product_preview', async (req, res) => {
    try {
        const products = await getProductPreviews();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
        });
    }
});

export default router;