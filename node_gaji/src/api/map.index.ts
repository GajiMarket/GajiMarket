import express from "express";
import { getProductPreviews } from "./DAO/Product_preview.dao";

const router = express.Router();

/**
 * @openapi
 * /product_preview:
 *   get:
 *     tags:
 *       - Map
 *     summary: 상품 미리보기 조회
 *     description: 상품의 미리보기 정보를 조회합니다.
 *     responses:
 *       200:
 *         description: 상품 미리보기 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                       productName:
 *                         type: string
 *                       productImage:
 *                         type: string
 *       500:
 *         description: 서버 오류
 */
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
