import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";
import {logger} from "../../logger";

export const getProductListService = async (): Promise<IProduct[]> => {
  try {
    // 쿼리 실행
    const query = `
      SELECT 
        p.product_id,
        p.title,
        p.sell_price,
        p.view_count,
        (SELECT i.image
          FROM team4.photo i
          WHERE i.product_id = p.product_id
          ORDER BY i.photo_id ASC
          LIMIT 1
        ) AS images
      FROM 
        ${schema}.product p 
      INNER JOIN 
        team4.photo i 
      ON 
        p.product_id = i.product_id 
      GROUP BY 
        p.product_id;
    `;
    const queryResult = await db.query<IProduct>(query);

    // 쿼리 결과가 없을 경우 빈 배열 반환
    if (!queryResult.rows || queryResult.rows.length === 0) {
      logger.info("DB Query Result: No products found.");
      return [];
    }

    // 쿼리 결과 출력
    logger.info("DB Query Result:", queryResult.rows);
    return queryResult.rows;
  } catch (error) {
    // 오류 로그 추가
    const err = error as Error;
    logger.error("Error in getProductListService:", err.message);

    // 오류를 다시 던져서 컨트롤러로 전달
    throw new Error("DB에서 제품 목록을 가져오는 중 오류가 발생했습니다.");
  }
};
