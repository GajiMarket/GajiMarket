import axios from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { IPathFinderParams, IPathResponse } from '../models/pathFinder.model';

export const findPathService = async (params: IPathFinderParams): Promise<IPathResponse> => {

    try {
        console.log("Calling external API with params:", params); // 올바른 서버 요청인지 확인
        const response = await axios.get<IPathResponse>(
            apiConfig.pathFinerApi.BASE_URL,
            {
                headers: {
                    'X-API-KEY': apiConfig.pathFinerApi.API_KEY,
                    "Content-Type": "application/json",
                },
                params,
            }
        )
        console.log("API Call Data:", params);
        console.log("External API Response:", response.data);
        return response.data;

    } catch (error) {
        console.log('API Connect Error:');
        if (axios.isAxiosError(error)) {
            console.error('에러 응답:', error.response?.data);
            console.error('에러 상태코드:', error.response?.status)
        }
        throw error;
    }
};