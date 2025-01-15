import {logger} from '../../logger'
import { productDetailDAO} from '../DAO/productDetail.dao';

export const productDetailService = async () => {
    try {

        const response = await productDetailDAO();

        if(!response) {
            logger.error({"service": `not ${response}`});
            return;
        }

        return response
    } catch(error) {
        logger.error(`500 error: ${error}` );
    }
}