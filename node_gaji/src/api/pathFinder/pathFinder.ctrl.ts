import { Request, Response } from "express";
import axios from "axios";
import { findPath } from "./pathFinder.api";
import { IPathFinderParams } from "./pathFinder.model";

const testPath = async (req: Request, res: Response): Promise<void> => {

    const { startX, startY } = req.query;

    try {
        const pathParams: Partial<IPathFinderParams> = {
            startX: parseInt(startX as string),
            startY: parseInt(startY as string),
            endX: 127.1064876,
            endY: 37.3591839,
            option: 'short',
            service: 'AR',
            srid: 4326   
        };

        const result = await findPath(pathParams as IPathFinderParams);
        res.json(result);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json({
                error: error.response?.data || error.message
            });
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

export default testPath;