import { findPathService } from './pathFinder.service';
import { IPathResponse, ICoordinates, IPathPostParams } from '../models/pathFinder.model';

export const pathFinderAPI = async (params: ICoordinates): Promise<IPathResponse> => {

    const apiCallData: Partial<IPathPostParams> = {
        ...params,
        option: "short",
        service: "wheel",
        srid: 4326,
    }

    const apiResponse = await findPathService(apiCallData as IPathPostParams);

    return apiResponse;
}