import { Request, Response } from "express";
import { addProductService } from "../service/product.service";
import {logger} from "../../logger";
import { IProduct } from "../models/product"; // IProduct 인터페이스 가져오기

// 제품 등록 컨트롤러
export const addProductCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // 요청 데이터 가져오기
    const {
      title,
      description,
      status,
      sell_price,
      sell_location,
      category_id,
      member_no,
    } = req.body;

    // 필수 필드 유효성 검사
    if (
      !title ||
      !description ||
      !status ||
      !sell_price ||
      !sell_location ||
      !category_id ||
      !member_no
    ) {
      res.status(400).json({
        success: false,
        message: "모든 필드를 입력해주세요.",
      });
      return;
    }

    // 서비스 계층을 통해 제품 등록 처리
    const newProduct: IProduct = await addProductService({
      product_id: 0, // DB에서 자동 생성되므로 초기값 설정
      title,
      description,
      status,
      sell_price,
      created_at: new Date(),
      view_count: 0, // 초기 조회수
      sell_location,
      category_id,
      member_no,
    });

    // 성공 응답 반환
    res.status(201).json({
      success: true,
      message: "제품이 성공적으로 등록되었습니다.",
      data: newProduct,
    });

  } catch (error) {
    // 에러 처리
    const err = error as Error;

    // 서버 에러 로그 기록
    logger.error("Error in addProductCtrl:", err.message);

    // 에러 응답 반환
    res.status(500).json({
      success: false,
      message: "서버 오류로 인해 제품을 등록하지 못했습니다.",
      error: err.message,
    });
  }
};
