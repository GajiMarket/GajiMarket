import axios from "axios";
import { usePathStore } from "../utils/pathStore";
import { Feature, Geometry } from "geojson";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface CustomProperties {
    totalLength: number; // 총 거리
    totalTime: number; // 총 소요 시간
    [key: string]: any;
}

export interface CustomFeature extends Feature<Geometry, CustomProperties> {}

export interface IPathResponse {
    type: string;
    // features: Feature<Geometry, GeoJsonProperties>[];
    features: CustomFeature[];
    coordinates?: [number, number][]; // 선택적으로 추가
}

// zustand로 상태저장한 product의 id, lng, lat값을 서버에 전달
export const sendPathData = async (): Promise<IPathResponse> => {
    const { longitude, latitude } = usePathStore.getState();
    // console.log("Coordinates from store:", { longitude, latitude });

    if (!longitude || !latitude) {
        console.error("Invalid coordinates:", { longitude, latitude });
        throw new Error("Coordinates are not set in the store.");
    }

    const payload = {
        startY: 37.479598,
        startX: 126.882238,
        endY: latitude,
        endX: longitude,
    };

    try {
        const response = await api.post<IPathResponse>('/navigation', payload);
        // console.log("Received Data:", response);
        // console.log("Features Exists:", !!response.data?.features);
        // console.log("Features is Array:", Array.isArray(response.data?.features));
        // console.log("Valid response received features:", response.data.features);

        return response.data;

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