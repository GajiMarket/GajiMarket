import { db } from "../../config/dbConfig";

export const getMypageLoveByUserId = async (member_no: number) => {
    const query = `
        SELECT 
            p.product_id,
            p.title,
            p.sell_price,
            pl.location,
            ph.image AS product_image
        FROM 
            team4.wish_list wl
        JOIN 
            team4.product p ON wl.product_id = p.product_id
        LEFT JOIN 
            team4.photo ph ON p.product_id = ph.product_id
        JOIN 
            team4.sell_location pl ON p.product_id = pl.product_id
        WHERE 
            wl.member_no = $16
    `;

    const result = await db.query(query, [member_no]);
    return result.rows;
};

export const removeMypageLoveItem = async (product_id: number, member_no: number) => {
    const query = `
        DELETE FROM team4.wish_list 
        WHERE product_id = $1 AND member_no = $2
    `;

    await db.query(query, [product_id, member_no]);
};
