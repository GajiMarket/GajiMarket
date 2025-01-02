export interface IChatMessage {
    message_id: number;
    chat_message: string;
    read_or_not: boolean;
    created_at: Date;
    chat_room_id: number;
    member_no: number;
    
}