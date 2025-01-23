import { Request, Response } from "express";
import { mypageLoveService } from "../service/mypage_love.service";
/**
 * @openapi
 * /{member_no}:
 *   get:
 *     tags:
 *       - Mypage
 *     summary: 관심목록 조회
 *     description: 특정 회원의 관심목록을 가져옵니다.
 *     parameters:
 *       - in: path
 *         name: member_no
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회원의 고유 번호
 *     responses:
 *       200:
 *         description: 관심목록 조회 성공
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
 *                   productPrice:
 *                     type: number
 *       404:
 *         description: 회원을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
// 관심목록 가져오기
export const getMypageLove = async (req: Request, res: Response) => {
    const member_no = Number(req.params.member_no);
    try {
        const mypageLove = await mypageLoveService.fetchMypageLove(member_no);
        res.status(200).json(mypageLove);
    } catch (error) {
        console.error("Failed to fetch Mypage Love:", error);
        res.status(500).json({ error: "Failed to fetch Mypage Love" });
    }
};
/**
 * @openapi
 * /{product_id}/{member_no}:
 *   delete:
 *     tags:
 *       - Mypage
 *     summary: 관심목록 항목 삭제
 *     description: 특정 회원의 관심목록에서 특정 항목을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 상품의 고유 ID
 *       - in: path
 *         name: member_no
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회원의 고유 번호
 *     responses:
 *       200:
 *         description: 관심목록 항목 삭제 성공
 *       404:
 *         description: 항목 또는 회원을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
// 관심목록 항목 삭제
export const deleteMypageLoveItem = async (req: Request, res: Response) => {
    const product_id = Number(req.params.product_id);
    const member_no = Number(req.params.member_no);
    try {
        await mypageLoveService.deleteMypageLoveItem(product_id, member_no);
        res.status(200).json({ message: "Item removed from Mypage Love" });
    } catch (error) {
        console.error("Failed to delete Mypage Love item:", error);
        res.status(500).json({ error: "Failed to delete Mypage Love item" });
    }
};

