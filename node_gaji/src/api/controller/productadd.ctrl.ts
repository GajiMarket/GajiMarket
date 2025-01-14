import { Request, Response } from "express";
import { IProduct } from "api/models/product";
import { addfinderAPI } from "../service/productadd.service";

export const productPathCtrl = async (req: Request, res: Response): Promise<void> => {
    try {

        //제목,가격,상품설명,좌표,유저id,올린시간,본사람수,
        console.log("productadd.ctrl_7번줄_req.body", req.body);
        const params: IProduct = req.body; // ICoordinates로 타입검증
            
        const productPathData = await addfinderAPI(params);

        res.status(200).json({
            message: "add finder API data processed successfully.",
            data: productPathData,
        });
    } catch (error) {
        console.error("Error productadd request:", error);
        res.status(500).json({
            message: "Internal server error.",
            details: error instanceof Error ? error.stack : "Unknown error",
        });
    }
}