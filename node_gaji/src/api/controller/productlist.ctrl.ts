import { Request, Response } from "express";
import { getProductListService } from "../service/productlist.service"; // 서비스 함수 가져오기
import logger from "../../logger"; // 로깅 기능 사용

// 제품 목록 가져오기 컨트롤러
export const getProductListCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const distance = req.query.distance ? Number(req.query.distance) : 500;

    logger.info(`getProductListCtrl: ${distance}m 거리 내 제품 목록을 조회합니다.`);

    // 서비스 함수 호출
    const products = await getProductListService(distance);

    if (products.length === 0) {
        res.status(404).json({
        success: false,
        message: "해당 거리 내 제품이 없습니다.",
      });
    }

    res.status(200).json({
      success: true,
      message: "제품 목록을 성공적으로 반환했습니다.",
      data: products,
    });
  } catch (error) {
    logger.error("getProductListCtrl: 제품 목록 가져오는 중 오류 발생", error);

    res.status(500).json({
      success: false,
      message: "서버 오류로 인해 제품 목록을 가져오지 못했습니다.",
    });
  }
};
