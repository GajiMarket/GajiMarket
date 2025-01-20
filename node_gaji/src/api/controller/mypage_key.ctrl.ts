import { Request, Response } from "express";
import { keywordService, getUserKeywords, deleteUserKeywords } from "../service/keyword.service";

export const keywordCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userNo, keywords } = req.body;
    console.log("request data:", userNo, keywords);

    // 유효성 검사
    if (!userNo || !Array.isArray(keywords) || keywords.length === 0) {
      res.status(400).json({
        success: false,
        message: "잘못된 요청입니다. userNo와 키워드 배열이 필요합니다.",
      });
      return; // 명확히 반환
    }

    // 키워드 추가 서비스 호출
    const result = await keywordService(userNo, keywords);

    res.status(200).json({
      success: true,
      message: "키워드가 성공적으로 추가되었습니다.",
      data: result,
    });
    return; // 명확히 반환
  } catch (error) {
    console.error("키워드 추가 실패:", error);

    res.status(500).json({
      success: false,
      message: "키워드 추가 중 서버 오류가 발생했습니다.",
    });
    return; // 명확히 반환
  }
};

export const getKeywords = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { userNo } = req.body;
    const userNo = parseInt(req.query.userNo as string, 10)
    console.log("user no:", userNo);

    // 유효성 검사
    if (!userNo) {
      res.status(400).json({
        success: false,
        message: "사용자 번호가 필요합니다.",
      });
      return; // 명확히 반환
    }

    // 키워드 조회 서비스 호출
    const keywords = await getUserKeywords(userNo);
    console.log("get keywords:", keywords);

    res.status(200).json({
      success: true,
      data: keywords,
    });
    return; // 명확히 반환
  } catch (error) {
    console.error("키워드 조회 실패:", error);

    res.status(500).json({
      success: false,
      message: "키워드 조회 중 서버 오류가 발생했습니다.",
    });
    return; // 명확히 반환
  }
};

export const deleteKeywords = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userNo, keyword } = req.body;
    
        if (!userNo || !keyword) {
          res.status(400).json({
            success: false,
            message: "userNo와 keyword가 필요합니다.",
          });
        }
    
        const updatedKeywords = await deleteUserKeywords(userNo, keyword);
    
        res.status(200).json({
          success: true,
          message: "키워드가 성공적으로 삭제되었습니다.",
          data: updatedKeywords,
        });
      } catch (error) {
        console.error("키워드 삭제 실패:", error);
        res.status(500).json({
          success: false,
          message: "키워드 삭제 중 서버 오류가 발생했습니다.", error
        });
      }
};
