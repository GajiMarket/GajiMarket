import { Request, Response } from "express";
import { addfinderAPI } from "../service/productadd.service";
import { logger } from "../../logger";
// import { IProduct } from "api/models/product";

export const productaddCtrl = async (req: Request, res: Response): Promise<void> => {


  try {
    const { title, sell_price, description, location, userNo, status } = req.body;
    logger.info(`Received product data:${req.body}`);
    console.log(`req.body data :  ${req.body}`)

    if (!title || !sell_price || !description || !location || !userNo || !status) {
      logger.error("Missing required fields");
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }
    const result = await addfinderAPI({
      title,
      sell_price,
      description,
      location,
      userNo,
      status,
      created_at: new Date(),
      view_count: 0,
    });


    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error productadd request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      details: error instanceof Error ? error.stack : "Unknown error",
    });
  }
}