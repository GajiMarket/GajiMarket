import { Request, Response } from "express";
import { addfinderAPI } from "../service/productadd.service";
import { logger } from "../../logger";
// import { IProduct } from "api/models/product";
/**
 * @openapi
 * /productadd:
 *   post:
 *     tags:
 *       - Product
 *     summary: 상품 추가
 *     description: 새 상품을 추가하고, 최대 10개의 이미지를 업로드합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 업로드할 상품 이미지 파일들
 *               productName:
 *                 type: string
 *                 example: "새로운 상품 이름"
 *                 description: 상품 이름
 *               productDescription:
 *                 type: string
 *                 example: "이 상품은 최고의 품질을 자랑합니다."
 *                 description: 상품 설명
 *               productPrice:
 *                 type: number
 *                 example: 19999
 *                 description: 상품 가격
 *     responses:
 *       201:
 *         description: 상품 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 productId:
 *                   type: integer
 *                   example: 123
 *                 message:
 *                   type: string
 *                   example: "상품이 성공적으로 추가되었습니다."
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
export const productaddCtrl = async (req: Request, res: Response): Promise<void> => {


  try {

    const images = req.files as Express.Multer.File[];

    const title = req.body.title as string;
    const sell_price = req.body.sell_price;
    const description = req.body.description as string;
    const member_no = req.body.userNo;
    const status = req.body.status as string;
   
    const sell_location = req.body.location;

   

    if (!title || !sell_price || !description || !sell_location || !member_no || !status) {
      logger.error("Missing required fields");
      logger.error("파라미터를 가져오지 못했습니다.")
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    if(!images || images.length === 0) {
      logger.error(`이미지를 가져오지 못했습니다: ${images}`);

      res.status(400).json({
        success:false,
        message: "이미지를 가져오지 못했습니다."
      })
    }

    const result = await addfinderAPI(
      images,{
      title,
      sell_price,
      description,
      // lng,
      // lat,
      sell_location,
      member_no,
      status,
    });

    if(!result) {
      logger.error(`반환 실패: ${result}`);
      return;
    }

    const imagesData = result.uploadFiles as string[];
    const productId = String(result.productId);

    logger.info(`imagesData값:${imagesData}`);
    logger.info(`productId값:${productId}`)


    res.status(200).json({
      success: true,
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    console.error("productadd 500 에러:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      details: error instanceof Error ? error.stack : "Unknown error",
    });
  }
}