import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const postLocation = async (longitude: number, latitude: number): Promise<void> => {
    try {
        await api.post("/", { longitude, latitude });
        console.log("Location sent to server", { longitude, latitude });
    } catch (error) {
        console.error("Failed to send location:", error);
    }
};