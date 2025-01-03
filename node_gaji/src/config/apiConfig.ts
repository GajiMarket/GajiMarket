import { IPathFinderParams } from "../../src/api/models/pathFinder.model";

export interface PathFinderConfig {
    headers: {
        API_KEY : string;
        type : string;
    };
    params: IPathFinderParams;
}

export const apiConfig = {
    pathFinerApi : {
        BASE_URL : "https://gis-v2-dot-lbstech-korea-service.an.r.appspot.com/v2/gcd/pathfinder",
        API_KEY : process.env.X_API_KEY || "default_x_api_key",
        type : "json",
    }
}