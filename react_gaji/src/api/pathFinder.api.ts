import axios from "axios";
import { usePathStore } from "../utils/pathStore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        // 'Content-Type': 'application/json',
    },
})

export interface IPathResponse {
    type: string;
    features: Feature<Geometry, GeoJsonProperties>[];
    // type: string;
    // features: Array<{
    //     type: string;
    //     id: string;
    //     geometry: {
    //         type: string;
    //         coordinates: number[];
    //     };
    //     properties: {
    //         nodeAId: string;
    //         nodeBId: string;
    //         length: number;
    //         srid: null;
    //         pathType: number;
    //         time: number;
    //         difficulty: number;
    //         index: number;
    //         guide: null;
    //     };
    // }>;
}

// zustand로 상태저장한 product의 id, lng, lat값을 서버에 전달
export const sendPathData = async (): Promise<void> => {
    const { longitude, latitude } = usePathStore.getState();
    console.log("Coordinates from store:", { longitude, latitude });

    if (!longitude || !latitude) {
        console.error("Invalid coordinates:", { longitude, latitude });
        throw new Error("Coordinates are not set in the store.");
    }

    const payload = {
        startY: 37.479598,
        startX: 126.882238,
        endY: latitude,
        endX: longitude,
    }

    try {
        const response = await api.post<IPathResponse>('/navigation', payload);
        console.log("Raw API Response:", response);
        console.log("Processed API Response:", response.data);
    
        if (!response.data || !response.data.features || !Array.isArray(response.data.features)) {
            console.error("Invalid response structure:", response.data);
            throw new Error("Invalid response structure: Features missing or not an array.");
        }

        response.data.features.forEach((feature, index) => {
            const geometry = feature.geometry;
        
            // 타입 좁히기
            if (geometry.type === "Point" || geometry.type === "LineString") {
                console.log(`Feature ${index} - Coordinates:`, geometry.coordinates);
            } else {
                console.warn(`Feature ${index} - Unsupported Geometry Type:`, geometry.type);
            }
        });
        
        // return response.data;
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