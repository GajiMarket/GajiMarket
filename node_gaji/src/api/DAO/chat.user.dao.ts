import { db, schema } from '../../config/dbConfig';
import { IChatUser } from '../models/chat.user.models';

export const getChatUserById = async (id: number): Promise<IChatUser | null> => {
    const result = await db.query('SELECT * FROM member_tbl WHERE member_no = $1', [id]);
    return result.rows[0] || null;
}