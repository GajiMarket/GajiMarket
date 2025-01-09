import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import NodeCache from 'node-cache'
import logger from '../../logger'

const cache = new NodeCache({ stdTTL: 600});

dotenv.config();

export const emailCode = async(email:string): Promise<number> => {

    try {

        console.log('받은 이메일:',email);
        

    const code:number = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.ADMIN_HOST,
        port: Number(process.env.ADMIN_PORT),
        secure: false,
        auth: {
            user: process.env.ADMIN_USER,
            pass: process.env.ADMIN_PASSWORD,
        },

    });

        const info = await transporter.sendMail({

            from: `${process.env.ADMIN_USER}`,
            to: email,
            subject: '가지마켓 회원가입 - 이메일 인증번호를 입력해주세요.',
            html: `인증번호 6자리를 입력해주세요<br>
            <p style="font-weight: bold; font-size: 20px;">인증코드: ${code}</p>`
        });

        //이메일 코드 node-cache저장
        cache.set(email, code);

        return code;
    } catch (error) {

        console.error('코드 전송중 서버에서 오류 발생:', error);
        throw error
        
    }
}

export const emailCheckService = (email: string, inputCode: number): boolean => {

    const storeCode = cache.get<number>(email);

    logger.debug("갖고온 email 파라미터", storeCode)

    if(!storeCode) {
        logger.error("인증 코드가 만료되었거나 존재하지 않습니다.");
        return false;
    }

    
    if(storeCode !== inputCode) {
        logger.error('인증 실패');
        return false;
    }

    // if (storeCode === inputCode) {
    //     logger.info('인증 성공');

    //     cache.del(email);

    //     return true;
        
    // } 

    logger.info('인증 성공');

    cache.del(email);

    return true;
        
}
