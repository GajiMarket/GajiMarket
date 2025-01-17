import { db } from "../../config/dbConfig";

export const fetchBuyHistory = async (member_no: number) => {
  try {
    const result = await db.query(
      `
      SELECT 
        p.product_id,
        p.title,
        p.sell_price,
        ST_AsText(p.sell_location) AS location,
        p.created_at,
        p.status,
        ph.image
      FROM team4.product p
      LEFT JOIN team4.photo ph ON p.product_id = ph.product_id
      WHERE p.buyer_no = $1
      ORDER BY p.created_at DESC
      `,
      [member_no]
    );
    return result.rows;
  } catch (error) {
    console.error("DAO에서 구매내역 가져오기 오류:", error);
    throw error;
  }
};
