import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const pathFinder = async (location: { lng: number, lat: number }) => {
    try {
        const response = await api.get('/navigation', {
            startX: location.lng,
            startY: location.lat,
            option: 'short',
            service: 'AR',
            srid: 4326
        });
        console.log('서버 응답:', response.data);
        return response.data

    } catch (error) {
        console.error('위치 전송 실패:', error);
        throw error;
    }
};