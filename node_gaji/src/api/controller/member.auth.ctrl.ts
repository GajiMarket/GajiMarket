import {Request, Response} from 'express'
import {loginService, signUpService, generateToken, getUserInfo, signKakao } from '../service/member.auth.service'




export const userCtrl = async (req:Request, res: Response) => {

        try {
            const id = req.body.id;
            const password  = req.body.password;
    
            if(id == '' && password == '') {
                res.status(400).json({
                    message: 'userCtrl: 값을 가져오지 못했습니다.'
                });
                
            }
    
            const response = await loginService(id, password);
    
            res.status(200).json({
                success: true,
                data: response,
                message: 'success',
    
            });
        } catch (error) {
    
            res.status(500).json({
                success: false,
                message:'userCtrl: 로그인 도중 서버에서 오류 발생'
            })
            // console.error('로그인 도중 오류 발생');
        }
    }
    
export const signCtrl = async (req: Request, res: Response) => {
    
        try {
            const formData:Record<string, string> = req.body;
    
            if(!formData) {
                res.status(400).json({
                    message: 'signCtrl: formData를 받아오지 못했습니다.'
                });
            };
    
            const response = await signUpService(formData);
    
            res.status(200).json({
                success: true,
                message: 'success'
    
            })
        } catch(error) {
    
            res.status(500).json({
                success: false,
                message: 'false',
            })
        }
    }

export const kakaoTokenCtrl = async (req:Request, res:Response) => {

    try {
        const {code} = req.body;
        
        if(!code) {

            return res.status(400).json({
                message: 'ctrl:코드를 받아오지 못했습니다.'
            })
        }

        const token = await generateToken(code);

        if(!token) {

            return res.status(500).json({
                message: 'ctrl:토큰을 가져오는데 실패했습니다.'
            })
        }

        
        

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 3600 * 1000,
        });

        res.status(200).json({
            message: 'success',
        });
    } catch(error) {

        console.error('kakaoCtrl 에러 발생', error);
        
        res.status(500).json({
            message: 'ctrl: 서버 에러',
        })
    }
}

export const kakaoUserInfoCtrl = async (req: Request, res:Response) => {
    try {

        const token = req.body
        
        const userInfo = await getUserInfo(token.access_token);

        if(!userInfo) {
            return res.status(500).json({
                message: 'ctrl: 사용자 정보를 가져오는데 실패했습니다.'
            })
        }

        res.status(200).json({
            success: true,
            message: 'ctrl: 사용자 정보 반환 성공',
            data: userInfo,
        });

    } catch (error) {
        
        console.error(error);
        throw new Error("ctrl: 카카오 사용자 정보 요청중 오류 발생")
        
    }
    
}

export const kakaoSignUp = async (req: Request, res: Response) => {

    try {
        const formData = req.body;

        if (!formData) {
            
        }

        const userUpdate = await signKakao(formData);

    }
}
