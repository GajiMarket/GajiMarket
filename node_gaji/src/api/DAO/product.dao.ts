import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";

export const addProductDAO = async (productData: IProduct) => {
  const { lng, lat } = productData.location; // location에서 lng, lat 분리

  const response = await db.query(
    `INSERT INTO ${schema}.product
      (title, sell_price, description, sell_location, created_at, view_count, member_no, status) 
     VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8, $9) RETURNING product_id`,
     [
      productData.title,           // $1
      productData.sell_price,           // $2
      productData.description,     // $3
      lng,  // $4
      lat,   // $5
      productData.created_at,       // $6
      productData.view_count,           // $7
      productData.userNo,          // $8
      productData.status,          // $9
    ]
  );

  console.log("response 값:", response.rows[0]);
  
  return response.rows[0];
};
