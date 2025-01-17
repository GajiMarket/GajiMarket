import {Request, Response} from 'express';
import {logger} from '../../logger';
import { productDetailService } from '../service/productDetail.service';



export const productDetail = async(req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        logger.debug({"가져온 id": id});
        

        const response = await productDetailService(id);

        logger.debug({"response": response})

        if(!response) {
            logger.error({"not returns.": response});
            return;
        }

        res.status(200).json({
            success: true,
            data: response,
        })

        
    } catch {
        res.status(500).json({
            success: false,
        })
    }
}

