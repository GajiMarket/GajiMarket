import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";

export const addProductDAO = async (productData: IProduct) => {
  const response = await db.query(
    `INSERT INTO ${schema}.product_tbl 
      (title, price, description, lng, lat, created_at, views, user_no, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
     [
      productData.product_id,           // $0
      productData.title,           // $1
      productData.sell_price,           // $2
      productData.description,     // $3
      productData.location.lng,    // $4
      productData.location.lat,    // $5
      productData.created_at,       // $6
      productData.view_count,           // $7
      productData.member_no,          // $8
      productData.status,          // $9
    ]
  );
  return response.rows[0];
};
