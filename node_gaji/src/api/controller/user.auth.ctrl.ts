import {Request, Response} from 'express'
import {loginService} from '../service/user.auth.service'

export const userCtrl = async (req:Request, res: Response) => {

    try {
        const id = req.body.id;
        const password  = req.body.password;
    } catch (error) {
        console.error('로그인 도중 오류 발생');
    }
}