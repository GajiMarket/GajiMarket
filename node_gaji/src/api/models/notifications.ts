export interface INotification {
    notice_id: number;
    notice_message: string;
    read_or_not: boolean;
    created_at: Date;
    member_no: number;
}