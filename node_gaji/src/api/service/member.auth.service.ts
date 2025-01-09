import axios from 'axios';
import {login, signUpDAO, saveOrUpdateUser, idCheckDAO} from '../DAO/member.auth.dao';
import { IMemberTbl } from '../models/member_tbl';
import logger from '../../logger';

// type loginType = Pick<IMemberTbl, "member_id" | "member_pwd" | "member_email">;
type signUpType = Omit<IMemberTbl, "accessToken" | "created_at">;
type loginType = Partial<IMemberTbl>;


export const idCheckService = async (id: string): Promise<loginType | null> => {
    if(!id && id == '') {
        logger.error("idCheckService: 파라미터가 전달되지 못했습니다.")
    }

    const idCheck = await idCheckDAO(id);

    return idCheck;
}


export const loginService = async (id: string, password:string): Promise<loginType> => {
    
    

    if (id == '' && password == '') {
        
        logger.error("loginService: Not Parameter")
    }

    const memberLogin = await login(id, password);

    return memberLogin;
}

export const signUpService = async (formData: Record<string, string>, password: string): Promise<boolean | void> => {

    console.log("service받아온값:", formData);
    


    if(!formData || !password) {

        logger.error("파라미터를 갖고 오지 못했습니다.")
        
        return;

    }
    
    const successSign = await signUpDAO(formData, password);

    if(!successSign) {

        logger.error("DAO에서 전달받지 못했습니다.")

        return;

    }

    return successSign;
}

// export const idCheck = async(id: string) => {
//     try {
//         if (!id) {
//             logger.error("idCheck: parameter not found")
//         }

//         logger.info("parameter to dao send:", id );
//         const response = await idCheckDAO(id);

//         return response;
//     } catch (error) {

//         logger.error(error);
//     }
// }



// 카카오 토큰 발급
export const generateToken = async(code: string) => {

  try {

    const response = await axios.post('https://kauth.kakao.com/oauth/token', {
        params: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_API_KEY,
            redirect_uri: process.env.REDIRECT_FRONT_URI,
            code,
        },
    });

    return response.data;

  } catch (error) {

    logger.error('kakao generateToken 에러:', error);
    return null;
  }
}

// 카카오 사용자 정보 가져오기
export const getUserInfo = async (accessToken: string) => {

    try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data; // 사용자 정보 반환

    } catch (error) {

        console.error('kakao userInfo 에러:', error);
        return null;
        
    }
}

export const signKakao = async (formData: Record<string, string>, password: string) => {

    try {

        if(!formData) {
            throw new Error('signKakao: formData값을 받아오지 못했습니다.')
        }

        const response = await saveOrUpdateUser(formData, password);


    } catch (error) {

        console.error('kakao signKakao 에러:', error);

        
    }
}