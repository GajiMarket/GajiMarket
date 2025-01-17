import { db } from "../../config/dbConfig";

// 판매내역 가져오기
export const getSellHistory = async (member_no: number) => {
    const query = `
      SELECT 
        p.product_id,
        p.title,
        p.sell_price,
        p.location,
        p.created_at,
        p.status,
        ph.image_url AS image
      FROM 
        team4.product AS p
      LEFT JOIN 
        team4.photo AS ph ON p.product_id = ph.product_id
      WHERE 
        p.seller_id = $1
    `;
    const values = [member_no];
    const result = await db.query(query, values);
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
