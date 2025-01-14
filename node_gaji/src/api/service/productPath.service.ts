import { findPathService } from './pathFinder.service';
import { IPathResponse, ICoordinates } from '../models/pathFinder.model';

export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {

    const apiCallData = {
        ...params,
        option: "short",
        service: "wheel",
        srid: 4326,
    }
    // console.log("API Call Data:", apiCallData);

    const apiResponse = await findPathService(apiCallData);

    // console.log("API Response:", apiResponse);

    return apiResponse;
}