import {db, schema} from '../../config/dbConfig'
import {logger} from '../../logger'

export const productDetailDAO = async () => {
    try {

        const response = await db.query(`SELECT title, description, status, sell_price, created_at, view_count, st_astext(sell_location) as location, member_no FROM ${schema}.product`);

        if(!response) {
            logger.error(`'not return': ${response}`);
            return;
        }

        return response.rows
    } catch(error) {
        logger.error('error 500');
    }
}