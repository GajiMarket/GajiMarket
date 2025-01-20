import { Request, Response } from "express";
import { addfinderAPI } from "../service/productadd.service";
import { logger } from "../../logger";
// import { IProduct } from "api/models/product";

export const productaddCtrl = async (req: Request, res: Response): Promise<void> => {


  try {

    const images = req.files as Express.Multer.File[];

    const title = req.body.title as string;
    const sell_price = Number(req.body.sell_price);
    const description = req.body.description as string;
    // const location = req.body.location;
    // const {lng, lat} = req.body;
    const userNo = Number(req.body.userNo);
    const status = req.body.status as string;
    // const { title, sell_price, description, userNo, status, } = req.body;

    // const locationData = JSON.stringify(req.body.location);

    // const lng = JSON.stringify(req.body.location.lng);
    // const lat = JSON.stringify(req.body.location.lat);
    // const name = JSON.stringify(req.body.location.name);

    // const location = JSON.parse(req.body.location);

    // console.log("location 뭐가 있나", location);

    const location = typeof req.body.location === 'string' ? JSON.parse(req.body.location) : req.body.location;

    const lng = Number(location.lng);
    const lat = Number(location.lat);
    const name: string = location.name as string;

    const locationData = [lng, lat];

    console.log("location 결과:", location);
    console.log("lng 결과:", lng);
    console.log("lat 결과:", lat);
    console.log("name 결과:", name);
    
    
    
    
    // const locationData = location

    // logger.debug(`각각 파라미터:${title},${sell_price},${description},${JSON.stringify(location)},${userNo}, ${status}`);

    // logger.debug(`갖고온 이미지들:${JSON.stringify(images)}`);
    // logger.info(`Received product data:${req.body}`);
    // console.log(`req.body data :  ${req.body}`)

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
      status,
    });

    if(!result) {
      logger.error(`반환 실패: ${result}`);
      return;
    }

    const imagesData = result.uploadFiles as string[];
    const productId = String(result.result);

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