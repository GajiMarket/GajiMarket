import { Request, Response } from "express";
import { mypageLoveService } from "../service/mypage_love.service";

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

