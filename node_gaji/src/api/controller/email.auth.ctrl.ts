import {Request, Response} from 'express'
import emailCode from '../service/email.auth.service'

const accountAuthEmail = async(req:Request, res:Response): Promise<void> => {

    try{

        // const testEmail = process.env.ADMIN_USER

        // const email: string = String(testEmail);
        const email: string = req.body.email;

        console.log('ctrl에서 받은 이메일', email);
        

        const auth = await emailCode.emailCode(email);

        console.log("인증코드:", auth);

        res.status(200).json({

            success: true,
            message: "Authentication email sent successfully",
            data: Number(auth) === 0 ? '' : Number(auth),
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

export default {accountAuthEmail}