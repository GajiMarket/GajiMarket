import { Request, Response } from 'express';
import { findUserById } from '../service/chat.user.service';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.id);
    const user = await findUserById(userId);
    if (user) {
        res.json(user);
    }else {
        res.status(404).json({error: 'User not found'});
    }
};