import logger from '../../logger'
import {db, schema} from '../../config/dbConfig';
import IPhoto from '../models/photo';

type Photo = Partial<IPhoto>


export const uploadImageDAO = async(url: string, id: number): Promise<Photo | void> => {

    const image = await db.query(`CALL ${schema}.userprofile($1, $2)`, [id, url]);

    const results = image.rows[0];

    return results as Photo;

    // // 해당 사용자의 이미지가 있는지 체크
    // const imageCheck = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

    // logger.debug("이미지 확인:", {"image": imageCheck.rows[0]});
    

    // if(imageCheck.rows[0]) {
    //     //이미지가 있다면 update 쿼리 실행

    //     const imageUpdate = await db.query(`UPDATE ${schema}.photo SET image = $1 WHERE member_no = $2`, [url, id]);

        
    //     logger.info({"사용 이미지 업데이트":imageUpdate.rowCount})

    //    if(imageUpdate.rowCount) {
    //     //업데이트가 됐다면 쿼리 실행
    //     const imageSelect = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

    //     logger.info({"이미지 경로":imageSelect.rows[0]});

    //     return imageSelect.rows[0] as Photo;
    //    }

    // }

    // //이미지가 없다면
    // if(imageCheck) {

    //     // 데이터 삽입
    //     const query = `INSERT INTO ${schema}.photo (image, member_no) VALUES ($1, $2)`
    
    //     const response = await db.query(query, [url, id]);
    
    //     if(response.rowCount as number > 0) {

    //         logger.debug("데이터 삽입 완료:", `데이터 삽입 수 :${response.rowCount as number}`);

    //         return;

    //     }

    // }

    // logger.error("response 값 삽입 실패");

    // return;

    

}

// 사용자의 프로필 이미지
export const profileDefault = async (id: number): Promise<Photo | void> => {


    const response = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

    if(response.rowCount as number <= 0) {

        logger.error("불러온 행이 없습니다.");

        return;

    }

    const imagePath = response.rows[0] as Photo

    return imagePath;
}