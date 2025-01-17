import { Request, Response } from "express";
import * as BuyService from "../service/mypage_buy.service";

// 구매내역 가져오기
export const getBuyHistory = async (req: Request, res: Response) => {
    const member_no = Number(req.params.member_no);
    try {
        const buyHistory = await BuyService.fetchBuyHistory(member_no);
        res.status(200).json(buyHistory);
    } catch (error) {
        console.error("Failed to fetch buy history:", error);
        res.status(500).json({ error: "Failed to fetch buy history" });
    }
};
