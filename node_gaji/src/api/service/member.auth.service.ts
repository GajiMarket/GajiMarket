import axios from 'axios';
import {login, signUpDAO, saveOrUpdateUser} from '../DAO/member.auth.dao';
import { IMemberTbl } from '../models/member_tbl';

type loginType = Pick<IMemberTbl, "member_id" | "member_pwd">;
type signUpType = Omit<IMemberTbl, "accessToken" | "created_at">;


export const loginService = async (id: string, password:string): Promise<loginType> => {

    return await login(id, password);
}

export const signUpService = async (formData: Record<string, string>): Promise<signUpType> => {

    if(!formData) {
        throw new Error('formData를 갖고 오지 못했습니다.')
        
    }

    return await signUpDAO(formData);
}

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

    console.error('kakao generateToken 에러:', error);
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

export const signKakao = async (formData: Record<string, string>) => {

    try {

        if(!formData) {
            throw new Error('signKakao: formData값을 받아오지 못했습니다.')
        }

        const response = await saveOrUpdateUser(formData);


    } catch (error) {

        console.error('kakao signKakao 에러:', error);

        
    }
}