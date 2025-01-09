import {Request, Response} from 'express'
import {emailCode, emailCheckService} from '../service/email.auth.service'
import logger from '../../logger'

export const accountAuthEmail = async(req:Request, res:Response): Promise<void> => {

    try{

        // const testEmail = process.env.ADMIN_USER

        // const email: string = String(testEmail);
        const email: string = req.body.data.email;

        console.log('ctrl에서 받은 이메일', email);
        

        const auth = await emailCode(email);

        console.log(auth);
        

        if(!auth) {
            logger.error("전송실패")
            res.status(400).json({
                success: false,
                message: "전송실패",
            })
        }

        console.log("인증코드:", auth);

        res.status(200).json({

            success: true,
            message: "Authentication email sent successfully",
            data: auth,
        });

        
    } catch (error) {

        console.error('Error in ctrl accountAuthEmail', error);

        const errorMessage = (error as Error).message;

        res.status(500).json({

            success: false,
            message: errorMessage
        });
        
    }
}


export const emailCheck = async(req: Request, res: Response) => {
    try {
        const code = req.body.data.code;
        const email = req.body.data.email;

        logger.info("받아온 코드:", {code});

        if(!code) {
            logger.error("코드를 받아오지 못했습니다.");
            res.status(400).json({
                success: false,
                message: "코드 반환 실패"
            })
        }

        const validateCode = await emailCheckService(email, code);

        logger.debug("입력 성공");

        res.status(200).json({
            success: true,
            data: validateCode,
            message:"입력 선공",
        });

        
    } catch (error) {
        
        logger.error("서버 요청 실패");
        res.status(500).json({
            success: false,
            message: "서버 요청 실패"
        });
    }
}
