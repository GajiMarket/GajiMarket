// import { db, schema } from "../../config/dbConfig";
// import { IProduct } from "../models/product";
// import { sendNotificationToUsers } from "../DAO/notifications.dao";
// import { logger } from "../../logger";

// // 제품 등록 서비스
// export const addProductService = async (productData: IProduct): Promise<IProduct> => {
//   try {
//     // 쿼리 실행
//     const query = `
//       INSERT INTO ${schema}.product (
//         title,
//         description,
//         status,
//         sell_price,
//         created_at,
//         view_count,
//         sell_location,
//         category_id,
//         member_no
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING product_id, title, description, status, sell_price, created_at, view_count, sell_location, category_id, member_no;
//     `;

//     const values = [
//       productData.title,
//       productData.description,
//       productData.status,
//       productData.sell_price,
//       productData.created_at,
//       productData.view_count,
//       productData.sell_location,
//       productData.category_id,
//       productData.member_no,
//     ];

//     const queryResult = await db.query<IProduct>(query, values);

//     // 쿼리 결과가 없을 경우 오류 반환
//     if (!queryResult.rows || queryResult.rows.length === 0) {
//       logger.error("DB Query Result: Failed to insert product.");
//       throw new Error("제품 등록에 실패했습니다.");
//     }

//     // 성공적으로 등록된 제품 반환
//     const newProduct = queryResult.rows[0];
//     logger.info("Product successfully added:", newProduct);

//     // 키워드와 매칭된 사용자에게 알림 전송
//     await sendNotificationToUsers(newProduct);

//     return newProduct;
//   } catch (error) {
//     // 오류 로그 추가
//     const err = error as Error;
//     logger.error("Error in addProductService:", err.message);

//     // 오류를 다시 던져서 컨트롤러로 전달
//     throw new Error("DB에 제품을 등록하는 중 오류가 발생했습니다.");
//   }
// };