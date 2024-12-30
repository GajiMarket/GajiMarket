import express from 'express';
import axios from 'axios';
import { apiConfig } from './config/apiConfig';
import { IWalk } from './api/pathFinder/pathFinder.model';

const app = express();
const port = 8080;

app.get('/test-path', async (req, res) => {
    try {
        const response = await axios.get<IWalk>(
            apiConfig.pathFinerApi.BASE_URL, {
                headers: {
                    'X-API-KEY': apiConfig.pathFinerApi.API_KEY,
                    'Content-Type': 'json'
                },
                params: {
                    startX: 127.1052186,
                    startY: 37.3595316,
                    endX: 127.1064876,
                    endY: 37.3591839,
                    option: 'safe',
                    service: 'pedestrian',
                    srid: 4326,
                    type: apiConfig.pathFinerApi.type
                }
            });

            console.log('API 연결 성공!');
            console.log('응답 데이터:', JSON.stringify(response.data, null, 2));

            res.json(response.data);
    } catch (error) {
        console.error('API 연결 에러:');
        if (axios.isAxiosError(error)) {
            console.error('에러 응답:', error.response?.data);
            console.error('에러 상태코드:', error.response?.status);
            res.status(error.response?.status || 500).json({
                error: error.response?.data || error.message
            });
        } else {
            console.error('에러:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})