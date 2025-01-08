import axios from "axios";
import { Feature, Geometry, GeoJsonProperties } from "geojson";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface IPathResponse {
    type: string;
    features: Feature<Geometry, GeoJsonProperties>[];
}

export const getPathFinder = async (): Promise<IPathResponse> => {
    try {
        const response = await api.get<IPathResponse>('/navigation');
        // console.log('API connected!', response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching path data:', error);
        throw error;
    }
};