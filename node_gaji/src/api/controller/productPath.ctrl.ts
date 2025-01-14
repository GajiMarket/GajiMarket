import { Request, Response } from "express";
import { pathFinderAPI } from "api/service/productPath.service";
import { ICoordinates } from "api/models/pathFinder.model";

export const postPathCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const params: ICoordinates = req.body; // ICoordinates로 타입검증

        if (!params.startY || !params.startX || !params.endY || !params.endX) {
            console.error("Payload validation failed:", params);
            res.status(400).json({ message: "Invalid payload. Please provide all required fields." });
            return;
        }

        const productPathData = await pathFinderAPI(params);

        res.status(200).json({
            message: "Path finder API data processed successfully.",
            data: productPathData,
        });
    } catch (error) {
        console.error("Error handling navigation request:", error);
        res.status(500).json({
            message: "Internal server error.",
            details: error instanceof Error ? error.stack : "Unknown error",
        });
    }
}

export const getPathCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const params: ICoordinates = req.body;

        const pathResult = await 
    }
}