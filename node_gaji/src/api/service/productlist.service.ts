import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";
import {logger} from "../../logger";

export const getProductListService = async (): Promise<IProduct[]> => {
  try {
    // 쿼리 실행
    const query = `
      SELECT product_id, title, sell_price, view_count
      FROM ${schema}.product;
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
