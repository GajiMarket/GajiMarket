import {db, schema} from '../../config/dbConfig'
import {QueryResult} from 'pg';
import {IMemberTbl} from '../models/member_tbl'
import logger from '../../logger';

// type loginType = Pick<IMemberTbl, "member_id" | "member_pwd" | "member_email">;
// type kakaoLoginType = Pick<IMemberTbl, "member_id" | "member_nick" | "member_email">;
type signUpType = Omit<IMemberTbl, "accessToken" | "created_at">;
type loginType = Partial<IMemberTbl>;

// 폴더 별로 역할을 나눌 경우
export const login = async (id: string, password: string): Promise<loginType> => {


    const response =  await db.query(`SELECT member_no, member_id, member_nick, member_pwd, member_email FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`, [String(id), String(password)]);

    logger.info(response.rows[0]);

    return response.rows[0] as loginType;

}


export const signUpDAO = async (formData: Record<string, string>): Promise<signUpType> => {

    const response = await db.query(`INSERT INTO ${schema} (member_id, member_pwd, member_phone, member_email, member_nick, member_name, member_addr, member_birth, member_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)`, [formData.id, formData.pw, Number(formData.phone), formData.email, formData.nick, formData.name, formData.addr, Number(formData.birth)]);

    return response.rows[0] as signUpType;
}

// 카카오는 1번
export const saveOrUpdateUser = async (formData: Record<string, string>): Promise<signUpType> => {

    if (!formData) {
        throw new Error('saveOrUpdateUser: formData값을 받아오지 못했습니다.')
    }

    const response = await db.query(`INSERT INTO ${schema} (member_id, member_pwd, member_phone, member_email, member_nick, member_name, member_addr, member_birth, member_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1) ON CONFLCT (member_id) DO UPDATE SET member_email = $4, member_nick = $5 RETURNING member_id`, [formData.id, formData.pw, Number(formData.phone), formData.email, formData.nick, formData.name, formData.addr, Number(formData.birth)])

    return response.rows[0] as signUpType

}



















// 수업에 배운대로 할경우

// export const login1 = async (id:string, password: string): Promise<IMemberTbl> => {

//     const query = `SELECT member_id, member_pwd FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`;

//     try {
        
//         const result: QueryResult = await db.query(query, [id, password]);

//         return result.rows[0] as IMemberTbl;
//     } catch (error) {
//         console.error('서버에서 로그인 실패:', error);
//         throw new Error(error as string);
        
//     }
// }




