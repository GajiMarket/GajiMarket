import { Request, Response } from "express";
import axios from "axios";
import { findPath } from "./pathFinder.api";
import { IPathFinderParams } from "./pathFinder.model";

const testPath = async (req: Request, res: Response): Promise<void> => {

    const { startX, startY } = req.query;

    try {
        const pathParams: Partial<IPathFinderParams> = {
            startX: 126.882218,
            startY: 37.479545,
            endX: 126.8804951,
            endY: 37.4814917,
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