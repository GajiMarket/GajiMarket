import axios from "axios";

interface Coordinate {
    lng: number;
    lat: number;
}

export const sendClickCoordinate = async (coordinate: Coordinate) => {
    try {
        const response = await axios.post('http://localhost:8080/navigation', {coordinate});
        return response.data
    } catch (error) {
        console.error('좌표 전송 실패:', error);
        throw error;
    }
};