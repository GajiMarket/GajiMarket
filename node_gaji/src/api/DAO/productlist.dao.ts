import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";
import {logger} from "../../logger";

// 제품 목록 가져오기 함수 (DAO)
export const getProductList = async (distance: number = 500): Promise<IProduct[]> => {
  try {
    // 쿼리 실행
    const query = `
      SELECT product_id, title, sell_price, view_count
      FROM ${schema}.product
      WHERE distance <= $1;
    `;
    const response = await db.query<IProduct>(query, [distance]);

    // 결과가 없을 경우 빈 배열 반환
    if (!response.rows || response.rows.length === 0) {
      logger.info("DB Query Result: No products found.");
      return [];
    }

    // 결과 출력 및 반환
    logger.info(`DB Query Result: ${response.rows.length} products found.`);
    return response.rows;
  } catch (error) {
    // 에러 처리 및 로그 기록
    const err = error as Error;
    logger.error("Error in getProductList:", err.message);
    throw new Error("DB에서 제품 목록을 가져오는 중 오류가 발생했습니다.");
  }
};
