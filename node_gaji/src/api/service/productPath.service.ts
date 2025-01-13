import { findPathService } from './pathFinder.service';
import { IPathResponse, ICoordinates } from '../models/pathFinder.model';

export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {
    console.log('params 데이터:', params);

    const apiCallData = {
        ...params,
        option: "short",
        service: "AR",
        srid: 4326,
    }
    console.log("API Call Data:", apiCallData);

    const apiResponse = await findPathService(apiCallData);
    console.log("API Response:", apiResponse);

    return apiResponse;
}