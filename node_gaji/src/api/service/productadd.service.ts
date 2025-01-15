import { addProductDAO } from "../DAO/product.dao";
import { IProduct } from "../models/product";
import logger from "../../logger";

export const addfinderAPI = async (productData: IProduct) => {
  try {
    logger.info("Processing product data in service:", productData);
    console.log("productData : ",productData)
    const result = await addProductDAO(productData);
    if (!result) {
      logger.error("Product insertion failed in DAO");
      throw new Error("Product insertion failed");
    }

    logger.info("Product added successfully in service");
    return result;
  } catch (error) {
    logger.error("Error in addProductService:", error);
    throw error;
  }
};
