import axios from 'axios';
import {login, signUpDAO, saveOrUpdateUser, idCheckDAO, pwCheckDAO} from '../DAO/member.auth.dao';
import { IMemberTbl } from '../models/member_tbl';
import logger from '../../logger';

type loginType = Partial<IMemberTbl>;


export const idCheckService = async (id: string): Promise<loginType | void> => {
    if(!id && id == '') {
        logger.error("idCheckService: 파라미터가 전달되지 못했습니다.")
        return;
    }

    const idCheck = await idCheckDAO(id);

    if(!idCheck) {
        logger.error("idCheckService: 값을 받아오지 못했습니다.");
        return;
    }

    return idCheck as loginType;
}

export const pwCheckService = async (id: string): Promise<loginType> => {

    if(!id && id == '') {
        logger.error("pwCheckService: 파라미터가 전달되지 못했습니다.");
    }

    const pwCheck = await pwCheckDAO(id);

    if(!pwCheck) {
        logger.error("pwCheckService: 값을 불러오지 못했습니다.")
    }

    return pwCheck
}


export const loginService = async (id: string, password:string): Promise<loginType | void> => {
    
    

    if (id == '' && password == '') {
        
        logger.error("loginService: Not Parameter")

        return;

    }

    const memberLogin = await login(id, password);

    if(memberLogin) {
        logger.error("loginService: 받은 데이터 값이 없습니다.");
    }

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