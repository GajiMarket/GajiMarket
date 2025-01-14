import logger from '../../logger'
import {db, schema} from '../../config/dbConfig';
import IPhoto from '../models/photo';

type Photo = Partial<IPhoto>


export const uploadImageDAO = async(url: string, id: number): Promise<Photo | void> => {

    // 해당 사용자의 이미지가 있는지 체크
    const imageCheck = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

    logger.debug("이미지 확인:", imageCheck.rows[0]);
    

    if(imageCheck) {
        //이미지가 있다면 update 쿼리 실행

        const imageUpdate = await db.query(`UPDATE ${schema}.photo SET image = $1 WHERE member_no = $2`, [url, id]);

       if(imageUpdate) {
        //업데이트가 됐다면 쿼리 실행
        const imageSelect = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

        return imageSelect.rows[0] as Photo;
       }

    }

    //이미지가 없다면
    if(imageCheck) {

        // 데이터 삽입
        const query = `INSERT INTO ${schema}.photo (image, member_no) VALUES ($1, $2)`
    
        const response = await db.query(query, [url, id]);
    
        if(response.rowCount as number > 0)

            logger.debug("데이터 삽입 완료:", `데이터 삽입 수 :${response.rowCount as number}`);

            return;

    }

    logger.error("response 값 삽입 실패");

    return;

    

}