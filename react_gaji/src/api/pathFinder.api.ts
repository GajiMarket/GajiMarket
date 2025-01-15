import axios from "axios";
import { usePathStore } from "../utils/pathStore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface IPathResponse {
    type: string;
    features: Feature<Geometry, GeoJsonProperties>[];
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
    };

    try {
        const response = await api.post<IPathResponse>('/navigation', payload);
        const features = Array.isArray(response.data?.features) ? response.data.features : [];

        // console.log(response);
        // console.log("API Response Data:", JSON.stringify(response.data, null, 2));

        if (features.length === 0) {
            console.error("Features field is missing or not an array:", response.data);
            throw new Error("Invalid response: features is not an array.");
        }

        console.log("Features Exists:", !!response.data?.features);
        console.log("Features is Array:", Array.isArray(response.data?.features));
        console.log("Valid response received:", response.data.features);

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