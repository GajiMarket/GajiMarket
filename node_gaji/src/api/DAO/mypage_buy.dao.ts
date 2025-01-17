import { db } from "../../config/dbConfig";

// 구매내역 가져오기
export const getBuyHistory = async (member_no: number) => {
    const query = `
        SELECT 
            p.product_id,
            p.title,
            p.sell_price,
            p.status,
            p.created_at,
            ph.image AS product_image
        FROM 
            team4.product p
        LEFT JOIN 
            team4.photo ph
        ON 
            p.product_id = ph.product_id
        WHERE 
            EXISTS (
                SELECT 1 
                FROM team4.orders o 
                WHERE o.product_id = p.product_id AND o.buyer_no = $1
            )
        ORDER BY 
            p.created_at DESC
    `;
    const result = await db.query(query, [member_no]);
    return result.rows;
};
