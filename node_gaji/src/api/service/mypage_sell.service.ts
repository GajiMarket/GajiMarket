import * as SellDAO from "../DAO/mypage_sell.dao";

export const fetchSellHistory = async (member_no: number) => {
    return await SellDAO.getSellHistory(member_no);
};

export const updateSellStatus = async (product_id: number, status: string) => {
    await SellDAO.updateSellStatus(product_id, status);
};
