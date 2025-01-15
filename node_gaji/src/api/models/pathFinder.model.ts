import { Feature, Geometry, GeoJsonProperties } from 'geojson';

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

export interface IPathResponse {
    type: "FeatureCollection";
    features: Feature<Geometry, GeoJsonProperties>[];
}

export interface IPathGetResponse {
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