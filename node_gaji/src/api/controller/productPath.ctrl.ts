import { Request, Response } from "express";
import { ICoordinates } from "api/models/pathFinder.model";
import { pathFinderAPI } from "../service/productPath.service";

export const productPathCtrl = async (req: Request, res: Response): Promise<void> => {
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