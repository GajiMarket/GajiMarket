import { Request, Response } from "express";
import * as SellService from "../service/mypage_sell.service";

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
