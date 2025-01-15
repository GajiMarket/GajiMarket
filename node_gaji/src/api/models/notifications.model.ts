// 알림 데이터 인터페이스
export interface INotifications {
    notice_id: number; // 알림 ID
    notice_message: string; // 알림 내용
    read_or_not: boolean; // 읽음 여부
    created_at: Date; // 생성 시간
    member_no: number; // 사용자 ID
    keyword_id: number; // 키워드 ID
}
