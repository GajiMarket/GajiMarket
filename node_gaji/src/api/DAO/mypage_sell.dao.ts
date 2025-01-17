import { db } from "../../config/dbConfig";

// 판매내역 가져오기
export const getSellHistory = async (member_no: number) => {
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
            p.member_no = $1
        ORDER BY 
            p.created_at DESC
    `;
    const result = await db.query(query, [member_no]);
    return result.rows;
};

// 판매 상태 업데이트
export const updateSellStatus = async (product_id: number, status: string) => {
    const query = `
        UPDATE team4.product 
        SET status = $1 
        WHERE product_id = $2
    `;
    await db.query(query, [status, product_id]);
};
