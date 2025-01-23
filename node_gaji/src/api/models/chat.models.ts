// 채팅 사용자

export interface IChatUser {
    chat_room_id: number;
    buyer_no: number;
    created_at: Date;
    member_no: number;
    product_id: number;
}

// 채팅 메시지

export interface IChatMessage {
    chat_message: string;
    read_or_not: boolean;
    created_at: Date;
    chat_room_id: number;
    member_no: number;
    images: string;
}

// 회원 정보

export interface IUser {
    member_no: number;
    member_id: string;
    member_pwd: string;
    member_phone: string;
    member_email: string;
    created_at: Date;
    member_login: boolean;
    accesstoken: string;
    member_nick: string;
    member_name: string;
    member_addr: string;
    member_birth: Date;
}
