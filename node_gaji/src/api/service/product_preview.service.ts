import { Product_preview } from "api/DAO/Product_preview.dao";
import {IProduct} from "api/models/product";

export const Product_previewService = async (): Promise<IProduct> => {
    return await Product_preview();
}