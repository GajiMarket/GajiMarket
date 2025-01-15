import { NextFunction, Request, Response } from "express";
import { pathFinderAPI } from "../service/productPath.service";
import { ICoordinates } from "../models/pathFinder.model";

export const postPathCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Raw Request Body:", req.body);
        console.log("Parsed Request Body:", JSON.stringify(req.body, null, 2));

        const { startX, startY, endX, endY }: ICoordinates = req.body;

        const productPathData = await pathFinderAPI({ startX, startY, endX, endY });

        const jsonResponse = JSON.stringify(productPathData, null, 2)
        console.log("JSON Response:", jsonResponse);
        res.status(200).send(jsonResponse);

    } catch (error) {
        console.error("Error handling navigation request:", error);
        res.status(500).json({
            message: "Internal server error.",
            details: error instanceof Error ? error.stack : "Unknown error",
        });
    }
}