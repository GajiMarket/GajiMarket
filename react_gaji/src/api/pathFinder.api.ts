import axios from "axios";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
// import { useProductStore } from "../utils/pathStore";

const api = axios.create({
    baseURL: import.meta.env.NODE_URI,
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface IPathData {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export interface IPathResponse {
    type: string;
    features: Feature<Geometry, GeoJsonProperties>[];
}

// zustand로 상태저장한 product의 id, lng, lat값을 서버에 전달
export const sendPathData = async (productId: number, longitude: number, latitude: number) => {
    try {
        const response = await api.post('/navigation', {
            productId,
            longitude,
            latitude,
        });
        
        console.log("Data successfully sent to server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending product data to server:", error);
        throw error;
    }
};

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