// src/dao/pathfinder.dao.ts
import axios, { AxiosInstance } from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { IWalk } from './walk.model';

export class PathFinderDao {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfig.pathFinerApi.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiConfig.pathFinerApi.API_KEY
            }
        });
    }

    // 경로 찾기 요청
    async findPath(params: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        option: string;
        service: string;
        srid: number;
    }): Promise<IWalk> {
        try {
            const response = await this.api.get<IWalk>('', {
                params: {
                    ...params,
                    type: apiConfig.pathFinerApi.type
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`PathFinder API Error: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    // 특정 경로 상세 정보 조회
    async getPathDetails(pathId: string): Promise<IWalk> {
        try {
            const response = await this.api.get<IWalk>(`/${pathId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get path details: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    // 여러 지점을 경유하는 경로 찾기
    async findMultiPointPath(waypoints: Array<{ x: number; y: number }>): Promise<IWalk> {
        try {
            const response = await this.api.post<IWalk>('/multi-point', {
                waypoints,
                type: apiConfig.pathFinerApi.type
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to find multi-point path: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    // 보행자 경로 찾기
    async findWalkingPath(params: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        option?: string;
    }): Promise<IWalk> {
        try {
            return await this.findPath({
                ...params,
                service: 'pedestrian',
                srid: 4326,
                option: params.option || 'recommendation'
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to find walking path: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    // API 에러 응답 처리를 위한 인터셉터 설정
    private setupInterceptors() {
        this.api.interceptors.response.use(
            response => response,
            error => {
                if (axios.isAxiosError(error)) {
                    // API 에러 응답 처리
                    const errorMessage = error.response?.data?.message || error.message;
                    console.error(`PathFinder API Error: ${errorMessage}`);
                    
                    // 401 에러 처리 (인증 실패)
                    if (error.response?.status === 401) {
                        console.error('API Key validation failed');
                    }
                    
                    // 429 에러 처리 (rate limit)
                    if (error.response?.status === 429) {
                        console.error('API rate limit exceeded');
                    }
                }
                return Promise.reject(error);
            }
        );
    }
}

// 사용 예시
/*
const pathFinderDao = new PathFinderDao();

// 보행자 경로 찾기 예시
async function getWalkingDirections() {
    try {
        const walkingPath = await pathFinderDao.findWalkingPath({
            startX: 127.1052186,
            startY: 37.3595316,
            endX: 127.1064876,
            endY: 37.3591839
        });
        console.log('Walking path found:', walkingPath);
    } catch (error) {
        console.error('Error finding walking path:', error);
    }
}
*/