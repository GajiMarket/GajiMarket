import { Request, Response } from "express";
import { wishlistService } from "../service/wishlist.service";

// 관심목록 가져오기
export const getWishlist = async (req: Request, res: Response) => {
    const member_no = Number(req.params.member_no);

    try {
        const wishlist = await wishlistService.fetchWishlist(member_no);
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};

// 관심목록에서 항목 삭제
export const deleteWishlistItem = async (req: Request, res: Response) => {
    const member_no = Number(req.params.member_no);
    const product_id = Number(req.params.product_id);

    try {
        await wishlistService.deleteWishlistItem(product_id, member_no);
        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Failed to delete wishlist item:", error);
        res.status(500).json({ error: "Failed to delete wishlist item" });
    }
};
