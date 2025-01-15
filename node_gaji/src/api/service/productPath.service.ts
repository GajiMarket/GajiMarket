import { findPathService } from './pathFinder.service';
import { IPathResponse, ICoordinates, IPathFinderParams } from '../models/pathFinder.model';

// export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {
export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {

    const apiCallData: Partial<IPathFinderParams> = {
        // ...params,
        startX: params.startX,
        startY: params.startY,
        endX: params.endX,
        endY: params.endY,
        option: "short",
        service: "wheel",
        srid: 4326,
    }

    const apiResponse = await findPathService(apiCallData as IPathFinderParams);

    console.log("API Response:", apiResponse.features);

    return apiResponse;
}