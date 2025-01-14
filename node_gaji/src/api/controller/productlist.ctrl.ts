import { Request, Response } from "express";
import { getProductListService } from "../service/productlist.service";
import logger from "../../logger";

export const getProductListCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // DB에서 제품 목록 가져오기
    const products = await getProductListService();

    // 제품이 없는 경우 404 반환
    if (!products || products.length === 0) {
        res.status(404).json({
        success: false,
        message: "제품 목록이 비어있습니다.",
      });
    }

    // 성공 응답 반환
    res.status(200).json({
      success: true,
      message: "제품 목록을 성공적으로 반환했습니다.",
      data: products,
    });
  } catch (error) {
    // 에러 처리
    const err = error as Error;
    
    // 서버 에러 로그 기록
    logger.error("Error in getProductListCtrl:", err.message);

    // 에러 응답 반환
    res.status(500).json({
      success: false,
      message: "서버 오류로 인해 제품 목록을 가져오지 못했습니다.",
      error: err.message,
    });
  }
};
