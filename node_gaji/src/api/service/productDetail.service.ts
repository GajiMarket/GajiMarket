import {logger} from '../../logger'
import { productDetailDAO} from '../DAO/productDetail.dao';

export const productDetailService = async (id: number) => {
    try {

        const response = await productDetailDAO(id);

        if(!response) {
            logger.error({"service": `not ${response}`});
            return;
        }

        logger.debug({"response": response});
        
        return response;

    } catch(error) {

        logger.error(`500 error: ${error}` );
    }
}