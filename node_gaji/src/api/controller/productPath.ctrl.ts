import { NextFunction, Request, Response } from "express";
import { pathFinderAPI } from "../service/productPath.service";
import { ICoordinates } from "../models/pathFinder.model";
/**
 * @openapi
 * /:
 *   post:
 *     tags:
 *       - Navigation
 *     summary: 상품 경로 등록
 *     description: 새로운 상품 경로를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               pathCoordinates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       example: 37.7749
 *                     longitude:
 *                       type: number
 *                       example: -122.4194
 *                 description: 상품 이동 경로의 좌표 배열
 *     responses:
 *       201:
 *         description: 상품 경로 등록 성공
 *       400:
 *         description: 잘못된 요청 데이터
 *       500:
 *         description: 서버 오류
 */
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