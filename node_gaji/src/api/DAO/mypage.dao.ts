import logger from '../../logger'
import {db, schema} from '../../config/dbConfig';


export const uploadImageDAO = async(url: string, id: number): Promise<string | void> => {

    const query = `INSERT INTO ${schema}.photo (image, member_no) VALUES ($1, $2)`

    
    const response = await db.query(query, [url, id]);

    if(!response) {
        logger.error("url뒤에 유저 번호 넣어야됨 20250111 작성하다 말음");

        return;
    }

    return response.rows[0];

}