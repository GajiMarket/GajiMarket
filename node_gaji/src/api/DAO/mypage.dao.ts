import {logger} from '../../logger'
import {db, schema} from '../../config/dbConfig';
import IPhoto from '../models/photo';
import IMemberTbl from 'api/models/member_tbl';

type Photo = Partial<IPhoto>
type Member = Partial<IMemberTbl>


export const uploadImageDAO = async(url: string, id: number): Promise<Photo | void> => {

    const image = await db.query(`CALL ${schema}.userprofile($1, $2)`, [id, url]);

    const results = image.rows[0];

    return results as Photo;

    
}

// 사용자의 프로필 이미지
export const profileDefault = async (id: number): Promise<Photo | void> => {


    const response = await db.query(`SELECT image FROM ${schema}.photo WHERE member_no = $1`, [id]);

    if(!response.rows[0]) {

        logger.error("불러온 행이 없습니다.");

        return;

    }

    const imagePath = response.rows[0] as Photo

    return imagePath;
}

export const profileNickDAO = async (nick: string, id: string): Promise<Member | void> => {

    try {
        if(!nick) {
            logger.error("profileNickDAO: 파라미터를 받아오지 못했습니다.");
            return;
        }

        const response = await db.query(`UPDATE ${schema}.member_tbl SET member_nick = $1 WHERE member_no = $2 RETURNING member_nick`,[nick, id]);

        const result = response.rows[0];

        return result as Member;

    } catch (error) {

        logger.error("profileNickDAO에서 에러 발생", error);
    }
}