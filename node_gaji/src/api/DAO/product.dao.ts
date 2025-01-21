import { db, schema } from "../../config/dbConfig";
import { IProduct, ILocation } from "../models/product";
import IPhoto from '../models/photo';
import {logger} from '../../logger';

type Product = Partial<IPhoto | IProduct | string>;


export const addProductDAO = async (productData: Record<string, string>): Promise<IProduct | string> => {
  // const { lng, lat } = productData.location; // location에서 lng, lat 분리

  const locationData = JSON.parse(productData.sell_location);
  // logger.info(`갖고온 파라미터: ${productData.title},${productData.description}`)

  logger.info(`JSON 변형: ${JSON.stringify(locationData)}`)

  // logger.info(`변형전: ${productData.sell_location}`)
  // logger.info(`JSON 변형: ${locationData}`);

  const lng = Number(locationData.lng);
  const lat = Number(locationData.lat);

  // const lng = Number(productData.sell_location.lng);
  // const lat = Number(productData.location[1]);


  logger.info(`갖고온 lng 값:${lng}`);
  logger.info(`갖고온 lat 값:${lat}`);

  const response = await db.query(
    `INSERT INTO ${schema}.product
      (title, sell_price, description, sell_location, member_no, status) 
     VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7) RETURNING product_id`,
     [
      productData.title,           // $1
      productData.sell_price,           // $2
      productData.description,     // $3
      lng,  // $4
      lat,   // $5        // $6
      productData.member_no,          // $7
      productData.status,          // $8
    ]
  );

  console.log("response 값:", response.rows[0]);
  
  return response.rows[0].product_id;
};



// 이미지 업로드

export const productImagesDAO = async (imageUrl: string[], productId: number): Promise<{images: string[]}| Product | void> => {

  try {

    logger.info(`갖고온 파라미터: imageUrl: ${imageUrl}, productId: ${productId}`);
    if(!imageUrl) {
      logger.error(`스토리지에 업로드한 이미지를 가져오지 못했습니다:${imageUrl}`);
      return;
    }



    // const queries = imageUrl.map((url) => ({
    //     text: `INSERT INTO ${schema}.photo (image, product_id) VALUES($1, $2) RETURNING product_id`,
    //     values: [url, productId],
    // }));

    let result = {};

    for (const image of imageUrl) {
      const query = {
        text: `INSERT INTO ${schema}.photo (image, product_id) VALUES($1, $2) RETURNING image, product_id`,
        values: [image, productId],
      };

      
    const response = await db.query(query);

    result = response.rows as Product; 

    logger.info(`result 값: ${result}`);
    

    };




   return result;

  } catch(error) {

    logger.error("500 productImagesDAO 에러 발생", error)
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
