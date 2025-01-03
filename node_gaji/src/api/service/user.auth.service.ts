import {login, login1} from '../DAO/user.auth.dao';
import { IMemberTbl } from '../models/member_tbl';


export const loginService = async (id: string, password:string): Promise<IMemberTbl> => {

    return await login(id, password);
}