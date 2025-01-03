import {db, schema} from '../../../config/dbConfig'
import {QueryResult} from 'pg';
import {IMemberTbl} from '../models/member_tbl'

// 폴더 별로 역할을 나눌 경우
export const login = async (id: string, password: string): Promise<IMemberTbl> => {

    const response =  await db.query(`SELECT member_id, member_pwd FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`, [id, password]);

    return response.rows[0] as IMemberTbl;

}


// 수업에 배운대로 할경우

export const login1 = async (id:string, password: string): Promise<IMemberTbl> => {

    const query = `SELECT member_id, member_pwd FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`;

    try {
        
        const result: QueryResult = await db.query(query, [id, password]);

        return result.rows[0] as IMemberTbl;
    } catch (error) {
        console.error('서버에서 로그인 실패:', error);
        throw new Error(error as string);
        
    }
}




