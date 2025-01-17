import { fetchBuyHistory } from "../DAO/mypage_buy.dao";

export const mypageBuyService = {
  fetchMypageBuy: async (member_no: number) => {
    try {
      return await fetchBuyHistory(member_no);
    } catch (error) {
      console.error("서비스 레벨에서 구매내역 처리 오류:", error);
      throw error;
    }
  },
};
