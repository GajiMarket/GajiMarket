import axios from "axios";
import { Geometry } from "geojson";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: { 'Content-Type': 'application/json', },
})

// API 타입 정의의
export interface PathFeatureProperties {
    index: number;
    totalLength: number;
    totalTime: number;
    maneuver?: string;
    nodeAId?: string;
    nodeBId?: string;
    length?: number;
    incline?: number;
    pathType?: number;
    time?: number;
    guide?: string;
}
export interface PathFeature {
    type: string;
    id: string;
    geometry: Geometry;
    properties: PathFeatureProperties;
}
export interface IPathResponse {
    type: string;
    features: PathFeature[];
}

// zustand로 상태저장한 product의 id, lng, lat값을 서버에 전달
export const sendPathData = async (longitude: number, latitude: number): Promise<void> => {

    if (!longitude || !latitude) {
        console.error("Invalid coordinates:", { longitude, latitude });
        return;
    }

    const payload = {
        // productId,
        startY: 37.479598,
        startX: 126.882238,
        endY: latitude, // lat값을 endY로 맵핑
        endX: longitude, // lng값을 endX로 맵핑
    }
    console.log("Payload being sent:", payload);

    try {
        const response = await api.post('/navigation', payload);
        console.log("Data successfully sent to server:", response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error response data:", error.response?.data);
            console.error("Error status code:", error.response?.status);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};

export const getPathFinder = async (): Promise<IPathResponse> => {
    try {
        const response = await api.get<IPathResponse>('/navigation');
        console.log('API connected!', response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching path data:', error);
        throw error;
    }
};