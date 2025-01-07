import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export interface IPathResponse {
    coordinates: number[][];
}

export const getPathFinder = async (): Promise<IPathResponse> => {
    try {
        const response = await api.get<IPathResponse>('/navigation');
        console.log('서버 응답:', response.data);
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error || error.message);
        }
        throw new Error("Unexpected error occurred");
    }
};