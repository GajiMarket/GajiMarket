import { Request, Response } from 'express';
import { db, schema } from '../../config/dbConfig';
import { IProduct } from '../models/product'
// import { userLocation } from '../controller/userLocation.ctrl';

export const getProducts = async (req: Request, res: Response): Promise<void> => {

    console.log({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    const { longitude, latitude } = req.body;
    const distance = Number(req.query.distance) || 500;

    const query = `
        SELECT *, ST_AsText(sell_location) AS sell_location
        FROM ${schema}.product
        wHERE ST_DistanceSphere(
            sell_location,
            ST_MakePoint($1, $2)
        ) <= $3;
    `;

    const queryResult = await db.query<IProduct>(query, [longitude, latitude, distance]);
    const results: IProduct[] = queryResult.rows;

    // 응답 반환
    res.status(200).json({
        message: 'Products fetched successfully',
        data: results,
    });

};