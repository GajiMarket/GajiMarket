import { Request, Response } from "express";
import * as SellService from "../service/mypage_sell.service";
/**
 * @openapi
 * /{member_no}:
 *   get:
 *     tags:
 *       - Mypage
 *     summary: 판매내역 조회
 *     description: 특정 사용자의 판매내역을 가져옵니다.
 *     parameters:
 *       - in: path
 *         name: member_no
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자의 고유 번호
 *     responses:
 *       200:
 *         description: 판매내역 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: integer
 *                   productName:
 *                     type: string
 *                   sellDate:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
// 판매내역 가져오기
export const getSellHistory = async (req: Request, res: Response) => {
    const member_no = Number(req.params.member_no);
    try {
        const sellHistory = await SellService.fetchSellHistory(member_no);
        res.status(200).json(sellHistory);
    } catch (error) {
        console.error("Failed to fetch sell history:", error);
        res.status(500).json({ error: "Failed to fetch sell history" });
    }
};
/**
 * @openapi
 * /{product_id}:
 *   patch:
 *     tags:
 *       - Mypage
 *     summary: 판매 상태 업데이트
 *     description: 특정 상품의 판매 상태를 업데이트합니다.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 상품의 고유 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "sold"
 *                 description: 새로운 판매 상태 (예: "sold", "pending", "canceled" 등)
 *     responses:
 *       200:
 *         description: 판매 상태 업데이트 성공
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 상품을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
// 판매 상태 업데이트
export const updateSellStatus = async (req: Request, res: Response) => {
    const product_id = Number(req.params.product_id);
    const { status } = req.body;
    try {
        await SellService.updateSellStatus(product_id, status);
        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Failed to update sell status:", error);
        res.status(500).json({ error: "Failed to update sell status" });
    }
};
