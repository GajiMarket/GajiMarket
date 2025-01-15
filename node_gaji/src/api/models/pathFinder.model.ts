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
    type: string;
    features: Array<{
        type: string;
        id: string;
        geometry: {
            type: string,
            coordinates: number[],
        };
        properties: {
            nodeAId: string,
            nodeBId: string,
            length: number,
            srid: null,
            pathType: number,
            time: number,
            difficulty: number,
            index: number,
            guide: null
        };
    }>
    // type: string;
    // features: Feature<Geometry, GeoJsonProperties>[];
}