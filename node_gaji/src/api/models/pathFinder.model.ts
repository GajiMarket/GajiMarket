interface Node {
    type: string;
    properties?: any;
    geometry?: any;
    features?: any;
}

export interface ICoordinates {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
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
    routes: Array<{
        paths: Array<{
            coordinates: number[][];
        }>;
    }>;
}

export interface IPathFinderAPI {
    getPath: (req: Request, res: Response) => Promise<void>;
}