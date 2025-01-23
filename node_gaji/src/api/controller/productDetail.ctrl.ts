import {Request, Response} from 'express';
import {logger} from '../../logger';
import { productDetailService } from '../service/productDetail.service';


/**
 * @openapi
 * /{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: 상품 상세 정보 조회
 *     description: 특정 상품의 상세 정보를 가져옵니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 상품의 ID
 *     responses:
 *       200:
 *         description: 상품 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: integer
 *                   example: 1
 *                 productName:
 *                   type: string
 *                   example: "상품 이름"
 *                 productPrice:
 *                   type: number
 *                   example: 19999
 *                 productDescription:
 *                   type: string
 *                   example: "상품 설명"
 *                 productImages:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *       404:
 *         description: 상품을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
export const productDetail = async(req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        logger.debug({"가져온 id": id});
        

        const response = await productDetailService(id);

        logger.debug({"response": response})

        if(!response) {
            logger.error({"not returns.": response});
            return;
        }

        res.status(200).json({
            success: true,
            data: response,
        })

        
    } catch {
        res.status(500).json({
            success: false,
        })
    }
}

