import { addProductDAO } from "../DAO/product.dao";
import { IProduct } from "../models/product";
import IPhoto from '../models/photo';
import {logger} from "../../logger";

type Product = Partial<IProduct|IPhoto>

export const addfinderAPI = async (productData: Product) => {
  try {
    logger.info(`Processing product data in service:${productData}`);
    console.log(`productData :${productData}`)
    const result = await addProductDAO(productData);
    if (!result) {
      logger.error("Product insertion failed in DAO");
      throw new Error("Product insertion failed");
    }

    logger.info("Product added successfully in service");
    return result;
  } catch (error) {
    logger.error(`Error in addProductService:${error}`);
    throw error;
  }
};

// export const addfinderAPI = async (productData: Product) => {
//   try {
//     logger.info(`Processing product data in service:${productData}`);
//     console.log(`productData :${productData}`)
//     const result = await addProductDAO(productData);
//     if (!result) {
//       logger.error("Product insertion failed in DAO");
//       throw new Error("Product insertion failed");
//     }

//     logger.info("Product added successfully in service");
//     return result;
//   } catch (error) {
//     logger.error(`Error in addProductService:${error}`);
//     throw error;
//   }
// };
