import { Request, Response } from "express";
import { IULocation } from "api/models/user_location";

export const userLocation = (req: Request, res: Response): void => {
    console.log("Request body:", req.body);

    const { longitude, latitude } = req.body;
    const location: IULocation = { longitude, latitude };

    
    res.status(200).json({
        message: "Location received!",
        data: {
            longitude,
            latitude,
        },
    });

    // return location;
};