import axios from "axios";

interface IMessageParams {
    id: number;
    sender: string;
    message: string;
    timestamp: string
}

export const sendMessagesToServer = async (payload: { roomId: string; userID: string; message: IMessageParams }) => {
    try {
        const response = await axios.post('/api/chat', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}