import {Request, Response} from 'express';
import {logger} from '../../logger';
import { productDetailService } from '../service/productDetail.service';



export const productDetail = async(req: Request, res: Response) => {

    try {

        const response = await productDetailService();

        if(!response) {
            logger.error({"not returns.": response});
            return;
        }

        
    } catch {
        res.status(500).json({
            success: false,
        })
    }
}

