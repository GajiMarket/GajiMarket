import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import 


//사용자 프로필 업데이트
export const updatePrfile = async (req: Request, res: Response) => {


    try {

        const nickName = req.body.nickname as string;
        const token = req.headers.authorization?.split(' ')[1] as string;

        const newNickname = updateService(nickName);

        
        

    }
}