import {Request, Response} from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {loginService, signUpService, generateToken, getUserInfo, signKakao } from '../service/member.auth.service'
import logger from '../../logger';
import { decode } from 'punycode';





// 로그인
export const userCtrl = async (req:Request, res: Response) => {

    
        try {
            // 요청 값 받는 부분
            const id: string = String(req.body.data.id);
            const password: string = String(req.body.data.pw);

            logger.info(id);
            logger.info(password);
    
            // 받은 요청값 유효성 검증
            if(id == '' && password == '') {

                logger.error("Data not success.")
                
            }

            // 요청값 보내고, 서비스에서 반환값 받음
    
            const response = await loginService(id, password);

            

            if (!response) {
                logger.error("userCtrl: Data valid false");
            }

            // 토큰 생성
            const key: string = process.env.TOKEN_KEY || "GajiMarket_login";
            const token = jwt.sign(
                { id: response.member_no, email: response.member_email, nickname: response.member_nick},
                key,
                {expiresIn: '1h'}
            );

            logger.debug(token);
            

            // HttpOnly 쿠키 토큰 저장
            // res.cookie('token', token, {
            //     httpOnly: true,//자바스립립트로 접근 불가
            //     sameSite: 'strict', // 동일 사이트 요청만 허용
            // })
    
            res.status(200).json({
                success: true,
                data: token,
                message: 'Login successfully',
    
            });
        } catch (error) {
    
            res.status(500).json({
                success: false,
                message:'userCtrl: 로그인 도중 서버에서 오류 발생'
            })
            // console.error('로그인 도중 오류 발생');
        }
    }

// 로그아웃
export const logout = async (req:Request, res:Response) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',

    })
    
    logger.info("logout successd")

    res.status(200).json({ 
        success: true,
        message: "logout successed",
    });
}

// 회원가입
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
                data: response,
                message: 'success'
    
            })
        } catch(error) {
    
            res.status(500).json({
                success: false,
                message: 'false',
            })
        }
    }

// 쿠키 token 유효성 검증
// req값이 pino에 안나옴
export const validateToken = (req: Request, res: Response) => {

    const token: string = req.cookies.token;

    logger.info("req.cookie:", token);

    if(!token) {

        res.status(400).json({
            message: '인증 되지 않은 사용자'
        });
    }
    
    const key: string = process.env.TOKEN_KEY || "GajiMarket_login" 
    jwt.verify(token, key, (err: Error | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
            logger.error(err);

            res.status(400).json({
                message: "유효 하지 않은 토큰"
            });
        }

        if(decoded && typeof decoded === 'object') {
            const user = decoded as JwtPayload;
            logger.debug(user);

            res.json({
                success: true,
                user
            });
        }

        if (!decoded) {
            logger.error("토큰 디코딩 실패");
            res.status(400).json({
                message: '토큰 디코딩 실패'
            });
        }
    })


}


// 일반 로그인 사용자 정보
export const getLoginInfo = async(req: Request, res: Response) => {

    const token = req.headers.authorization?.split(' ')[1] as string; // Bearer 토큰에서 추출
    const key: string = process.env.TOKEN_KEY || "GajiMarket_login" 

    logger.info("token:", token);

    if(!token) {

        res.status(400).json({
            success: false,
            data: token,
            message: '토큰이 제공 되지 않았습니다.'
        })
    }

    try {

        // jwt.verify(token, key, (err, decoded) => {


        //     if (err) {
        //         logger.error(err);

        //         res.status(400).json({message: '유효하지 않은 토큰'});
        //     }

        //     const user = decoded as JwtPayload

            // logger.debug(user); 
            
        // });

            const decoded = jwt.verify(token, key) as JwtPayload

            logger.debug(decoded);

            res.status(200).json({
                success: true,
                data: decoded
        });

       
    } catch(err) {

        logger.error(err);
        
        res.status(500).json({
            success: false,
            message: '유효하지 않은 토큰입니다.'
        });
    };
}


// Cannot set headers after they are sent to the client 해당 오류는 res중복

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
        
        res.status(400).json({
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

    } catch (error) {
        
        console.error(error);
        
    }

}
