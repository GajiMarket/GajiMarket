import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product";
import logger from "../../logger";

// ✅ 제품 목록 가져오기 서비스 함수
export const getProductListService = async (distance: number): Promise<IProduct[]> => {
  try {
    logger.info(`getProductListService: ${distance}m 거리 내 제품 목록을 조회합니다.`);

    // SQL 쿼리 작성
    const query = `
      SELECT id, title, location, distance, time, image_url
      FROM ${schema}.product
      WHERE distance <= $1;
    `;

    // DB 쿼리 실행
    const queryResult = await db.query<IProduct>(query, [distance]);

    // 결과 처리
    const products: IProduct[] = queryResult.rows;

    logger.info(`getProductListService: ${products.length}개의 제품을 반환합니다.`);

    return products;
  } catch (error) {
    logger.error("getProductListService: 제품 목록 조회 중 오류 발생", error);
    throw new Error("서비스 오류: 제품 목록을 가져올 수 없습니다.");
  }
};
