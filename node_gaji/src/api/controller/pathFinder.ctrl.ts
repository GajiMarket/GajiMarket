import { Request, Response } from "express";
import axios from "axios";
import { findPathService } from "../service/pathFinder.service";
import { IPathFinderParams } from "../models/pathFinder.model";

const pathFinderAPI = async (req: Request, res: Response) => {

    try {
        const { longitude, latitude } = req.query;
        if (!longitude || !latitude) {
            return res.status(400).json({
                success: false,
                message: "lng, lat parameters are required",
            });
        }

        const params: IPathFinderParams = {
            endX: longitude,
            endY: latitude,
        }

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

export default pathFinderAPI;