import { Request, Response } from "express";
import { db, schema } from "../../config/dbConfig";
import { IProduct } from "../models/product"; // Product 인터페이스

// 제품 목록 가져오기 함수
export const getProductList = async (req: Request, res: Response): Promise<void> => {
  try {
    // 요청 파라미터에서 검색 거리(distance) 가져오기
    const distance = Number(req.query.distance) || 500;

    // SQL 쿼리 작성
    const query = `
      SELECT id, title, location, distance, time, image_url
      FROM ${schema}.product
      WHERE distance <= $1;
    `;

    // DB 쿼리 실행
    const queryResult = await db.query<IProduct>(query, [distance]);

    // 결과 처리
    const results: IProduct[] = queryResult.rows;

    // 응답 반환
    res.status(200).json({
      message: "Product list fetched successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(500).json({
      message: "Failed to fetch product list"
    });
  }
};
