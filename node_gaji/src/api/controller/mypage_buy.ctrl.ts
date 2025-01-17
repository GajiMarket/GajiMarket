import { Request, Response } from "express";
import { mypageBuyService } from "../service/mypage_buy.service";

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
