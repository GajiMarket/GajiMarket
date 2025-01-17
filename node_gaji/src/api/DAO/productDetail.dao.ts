import {db, schema} from '../../config/dbConfig'
import {logger} from '../../logger'

export const productDetailDAO = async (id: number) => {
    try {

        const response = await db.query(`SELECT * FROM team4.product_and_image WHERE product_id = $1`, [id]);

        if(!response) {
            logger.error(`'not return': ${response}`);
            return;
        }

        return response.rows[0];

    } catch(error) {
        logger.error('error 500');
    }
}