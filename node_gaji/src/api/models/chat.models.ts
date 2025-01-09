// 채팅 사용자
export interface IChatUser {
    chat_room_id: number;
    buyer_id: number;
    created_at: Date;
    member_no: number;
    product_id: number;
}

// 채팅 메세지
export interface IChatMessage {
    message_id: number;
    chat_message: string;
    read_or_not: boolean;
    created_at: Date;
    chat_room_id: number;
    member_no: number;
    images: string;
}