export interface ICoordinates {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export interface IPathPostParams {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    option: string;
    service: string;
    srid: number;
}

export interface IPathFinderParams {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    option: string;
    service: string;
    srid: number;
    type: string;
    features: Node;
    id: string;
    geometry: Node;
    coordinates: string;
    properties: Node;
    index: number;
    totalLength: number;
    totalTime: number;
    maneuver: string;
    nodeAId: string;
    nodeEId: string;
    length: string;
    incline: number;
    pathType: number;
    time: number;
    guide: string;
}

export interface IPathResponse {
    // type: string;
    // features: Array<{
    //     type: string;
    //     id: string;
    //     geometry: {
    //         type: string,
    //         coordinates: number[][],
    //     };
    //     properties: {
    //         nodeAId: string,
    //         nodeBId: string,
    //         length: number,
    //         srid: null,
    //         pathType: number,
    //         time: number,
    //         difficulty: number,
    //         index: number,
    //         guide: null
    //     };
    // }>
    routes: Array<{
        paths: Array<{
            coordinates: number[][];
        }>;
    }>;
}