import axios from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { IPathFinderParams, IPathResponse, ICoordinates } from './pathFinder.model';

export const findPath = async (params: IPathFinderParams): Promise<IPathResponse> => {

    try {
        const response = await axios.get<IPathResponse>(
            apiConfig.pathFinerApi.BASE_URL,
            {
                headers: {
                    'X-API-KEY': apiConfig.pathFinerApi.API_KEY,
                    'Content-Type': apiConfig.pathFinerApi.type
                },
                params
            }
        )
        console.log('API Connected Success!');
        // console.log('Response data:', JSON.stringify(response.data, null, 2));
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