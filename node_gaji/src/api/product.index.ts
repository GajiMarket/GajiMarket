import express from "express";
import { getProductListCtrl } from './controller/productlist.ctrl';
import { productDetail } from "./controller/productDetail.ctrl";

const router = express.Router();

/**
 * @openapi
 * /list:
 *   get:
 *     tags:
 *       - Product
 *     summary: 상품 목록 조회
 *     description: 등록된 모든 상품의 목록을 가져옵니다.
 *     responses:
 *       200:
 *         description: 상품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: integer
 *                     example: 1
 *                   productName:
 *                     type: string
 *                     example: "상품 이름"
 *                   productPrice:
 *                     type: number
 *                     example: 19999
 *                   productDescription:
 *                     type: string
 *                     example: "상품 설명"
 *       500:
 *         description: 서버 오류
 */
router.get('/list', getProductListCtrl)

// router.get('/:productId', )

router.get('/:id', productDetail);

export default router;