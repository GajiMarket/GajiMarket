import {Request, Response} from 'express'
import {emailCode, emailCheckService} from '../service/email.auth.service'
import {logger} from '../../logger'
/**
 * @openapi
 * /emailSend:
 *   post:
 *     tags:
 *      - Member
 *     summary: 이메일 인증 코드 전송
 *     description: 회원가입을 위한 이메일 인증 코드를 발송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: 인증 코드 전송 성공
 *       400:
 *         description: 잘못된 요청
 */
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

 /**
 * @openapi
 * /emailcheck:
 *   post:
 *     tags:
 *      - Member
 *     summary: 이메일 인증 코드 확인
 *     description: 사용자가 입력한 인증 코드가 올바른지 확인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: 인증 성공
 *       400:
 *         description: 인증 실패
 */
export const emailCheck = async(req: Request, res: Response) => {
    try {
        const code = req.body.data.code;
        const email = req.body.data.email;

        console.log("code랑 email:", code, "",email);

        if(!code) {
            logger.error("코드를 받아오지 못했습니다.");
            res.status(400).json({
                success: false,
                message: "코드 반환 실패"
            });

            return;
        }

        const validateCode = await emailCheckService(email, code);

        console.log("validateCode boolean 값:", validateCode);

        if(validateCode === false) {

            res.status(400).json({
                success: false,
                message: "값이 일치하지 않거나 코드가 만료되었습니다..",
            });

            logger.error("값이 일치하지 않거나 코드가 만료되었습니다..")

            return;
        }
        

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

        return;
    }
}
