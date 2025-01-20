import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";
import IPhoto from '../models/photo';
import {logger} from '../../logger';

type Product = Partial<IPhoto&IProduct>;


export const addProductDAO = async (productData: Product): Promise<Product> => {
  // const { lng, lat } = productData.location; // location에서 lng, lat 분리

  const lng = productData.location?.lng;
  const lat = productData.location?.lat;

  const response = await db.query(
    `INSERT INTO ${schema}.product
      (title, sell_price, description, sell_location, view_count, member_no, status) 
     VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8, $9) RETURNING product_id`,
     [
      productData.title,           // $1
      productData.sell_price,           // $2
      productData.description,     // $3
      lng,  // $4
      lat,   // $5
      productData.view_count,           // $6
      productData.userNo,          // $7
      productData.status,          // $8
    ]
  );

  console.log("response 값:", response.rows[0]);
  
  return response.rows[0];
};



// 이미지 업로드

export const productImagesDAO = async (imageUrl: string[], productId: number): Promise<{images: string[]}| Product | void> => {

  try {
    if(!imageUrl) {
      logger.error(`스토리지에 업로드한 이미지를 가져오지 못했습니다:${imageUrl}`);
      return;
    }

    // const queries = imageUrl.map((url) => ({
    //     text: `INSERT INTO ${schema}.photo (image, product_id) VALUES($1, $2) RETURNING product_id`,
    //     values: [url, productId],
    // }));

    for (const image of imageUrl) {
      const query = {
        text: `INSERT INTO ${schema}.photo (image, product_id) VALUES($1, $2) RETURNING product_id`,
        values: [image, productId],
      };

      
    const response = await db.query(query);

    };




   return;

  } catch {

    logger.error("500 productImagesDAO 에러 발생")
    throw new Error('productImagesDAO 에러 발생');
  }
}







// export const addProductDAO = async (productData: Product): Promise<Product> => {
//   // const { lng, lat } = productData.location; // location에서 lng, lat 분리

//   const lng = productData.location?.lng;
//   const lat = productData.location?.lat;

//   const response = await db.query(
//     `INSERT INTO ${schema}.product
//       (title, sell_price, description, sell_location, view_count, member_no, status) 
//      VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8, $9) RETURNING product_id`,
//      [
//       productData.title,           // $1
//       productData.sell_price,           // $2
//       productData.description,     // $3
//       lng,  // $4
//       lat,   // $5
//       productData.view_count,           // $6
//       productData.userNo,          // $7
//       productData.status,          // $8
//     ]
//   );

//   console.log("response 값:", response.rows[0]);
  
//   return response.rows[0];
// };
