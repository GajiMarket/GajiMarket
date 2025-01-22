import axios from "axios";

const server: string = import.meta.env.VITE_API_LOCAL;

const google: string = import.meta.env.VITE_GOOGLE_URL;

const api = axios.create({
    baseURL: import.meta.env.NODE_ENV === 'production' ? `${google}` : `${server}`,
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