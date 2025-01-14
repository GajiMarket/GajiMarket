import { Request, Response } from 'express';
import { findPathService } from './pathFinder.service';
import { IPathResponse, ICoordinates } from '../models/pathFinder.model';
// import { productPathCtrl } from 'api/controller/productPath.ctrl';

export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {
// export const pathFinderAPI = async (req: Request, res: Response): Promise<void> => {

    const apiCallData = {
        ...params,
        option: "short",
        service: "wheel",
        srid: 4326,
    }
    console.log("API Call Data:", apiCallData);

    const apiResponse = await findPathService(apiCallData);

    console.log("API Response:", apiResponse);

    return apiResponse;
}