import * as BuyDAO from "../DAO/mypage_buy.dao";

export const fetchBuyHistory = async (member_no: number) => {
    return await BuyDAO.getBuyHistory(member_no);
};
