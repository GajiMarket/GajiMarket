import { Request, Response } from "express";
import { mypageBuyService } from "../service/mypage_buy.service";
/**
 * @openapi
 * /{member_no}:
 *   get:
 *     tags:
 *       - Mypage
 *     summary: 구매 내역 조회
 *     description: 특정 사용자의 구매 내역을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: member_no
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자의 고유 번호
 *     responses:
 *       200:
 *         description: 구매 내역 조회 성공
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
 *         description: 사용자를 찾을 수 없음
 */
export const getMypageBuy = async (req: Request, res: Response) => {
  const member_no = Number(req.params.member_no);

  try {
    const buyHistory = await mypageBuyService.fetchMypageBuy(member_no);
    res.status(200).json(buyHistory);
  } catch (error) {
    console.error("구매내역을 가져오는 중 오류 발생:", error);
    res.status(500).json({ error: "구매내역을 가져오는 데 실패했습니다." });
  }
};
