import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const emailCode = async(email:string): Promise<number> => {

    const code:number = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.ADMIN_HOST,
        port: Number(process.env.ADMIN_PORT),
        secure: false,
        auth: {
            user: process.env.ADMIM_USER,
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

    return code;
}

export default {emailCode}