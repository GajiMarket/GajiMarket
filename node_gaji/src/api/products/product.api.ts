import { Request, Response } from "express";
import path from "path";
import fs from 'fs/promises';

const dummyFilePath = path.join(__dirname, '../../data/destinationData.json')

interface Destination {
    id: string;
    product_preview_name: string;
    product_preview_explanation: string;
    product_preview_price: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
    product_preview_distance: string;
}

export const sendProductData = async(req: Request, res: Response):Promise<void> => {
    try {
        const data = await fs.readFile(dummyFilePath, 'utf-8');
        const jsonData: Destination[] = JSON.parse(data);
        res.status(200).json(jsonData);

    } catch (error) {
        console.error('JSON 데이터 처리 오류:', error);
        res.status(500).json({ error: '데이터를 가져오는데 실패' });
    }
};