import { NextFunction, Request, Response } from "express";
import { pathFinderAPI } from "../service/productPath.service";
import { ICoordinates } from "../models/pathFinder.model";

export const postPathCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("send data:", req.body)
        const { startX, startY, endX, endY }: ICoordinates = req.body;

        if (!startX || !startY || !endX || !endY) {
            throw new Error("Invalid query parameters. Please provide all required fields.");
        }

        const productPathData = await pathFinderAPI({ startX, startY, endX, endY });

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

// export const getPathCtrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { startX, startY, endX, endY }: ICoordinates = req.body;
//     if (!startX || !startY || !endX || !endY) {
//         throw new Error("Invalid query parameters. Please provide all required fields.");
//     }

//     const params = {
//         startX, startY,
//         endX, endY
//     }
//     const result = await pathFinderAPI(params);
//     console.log(result);

//     res.status(200).json({
//         message: "패스 받아오기 성공",
//         data: result,
//     });
// }