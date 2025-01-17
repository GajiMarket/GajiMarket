import { getMypageLoveByUserId, removeMypageLoveItem } from "../DAO/mypage_love.dao";

export const mypageLoveService = {
    fetchMypageLove: async (member_no: number) => {
        return await getMypageLoveByUserId(member_no);
    },
    deleteMypageLoveItem: async (product_id: number, member_no: number) => {
        await removeMypageLoveItem(product_id, member_no);
    },
};
