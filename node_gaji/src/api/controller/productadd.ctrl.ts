import { Request, Response } from "express";
import { addfinderAPI } from "../service/productadd.service";
import { logger } from "../../logger";
// import { IProduct } from "api/models/product";

export const productaddCtrl = async (req: Request, res: Response): Promise<void> => {


  try {

    const images = req.files as Express.Multer.File[];

    // const title = req.body.title;
    // const sell_price = req.body.sell_price;
    // const description = req.body.description;
    // const location = req.body.location;
    // // const {lng, lat} = req.body;
    // const userNo = req.body.userNo;
    // const status = req.body.status;
    const { title, sell_price, description, name, userNo, status } = req.body;

    const {lng, lat} = req.body;

    const location = {lng, lat};
    
    // const locationData = location

    logger.debug(`각각 파라미터:${title},${sell_price},${description},${location},${userNo},${status}`);

    // logger.debug(`갖고온 이미지들:${JSON.stringify(images)}`);
    logger.info(`Received product data:${req.body}`);
    console.log(`req.body data :  ${req.body}`)

    if (!title || !sell_price || !description || !location || !userNo || !status) {
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
      location,
      userNo,
      name,
      status,
    });

    if(!result) {
      logger.error(`반환 실패: ${result}`);
      return;
    }

    const imagesData = result.uploadFiles;
    const productId = result.result;

    logger.info(`imagesData값:${imagesData}`);
    logger.info(`productId값:${productId}`)


    res.status(200).json({
      success: true,
      message: "Product added successfully",
      imagesData,
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