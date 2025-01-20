import { db, schema } from "../../config/dbConfig";
import { INotifications } from "../models/notifications.model";

export const getMatchingKeywordsDAO = async (title: string, description: string) => {
    const response = await db.query(
        `SELECT k.keyword_id, k.keyword, k.member.no
        FROM ${schema}.keyword k
        WHERE $1 ILIKE '%' || k.keyword || '%' OR $2 ILIKE '%" || k.keyword || '%'`,
        [title, description]
    );
    console.log('알람 데이터:', response.rows);
    return response.rows;
}

export const createNotificationsDAO = async (notifications: Omit<INotifications, "notice_id">[]) => {
    const queries = notifications.map(({ notice_message, read_or_not, created_at, member_no, keyword_id }) =>
      db.query(
        `INSERT INTO ${schema}.notifications
          (notice_message, read_or_not, created_at, member_no, keyword_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [notice_message, read_or_not, created_at, member_no, keyword_id]
      )
    );
    await Promise.all(queries); // 병렬 처리
};


// 사용자별 알림 가져오기
export const getNotificationsByUserId = async (member_no: number): Promise<INotifications[]> => {
    const result = await db.query(
        `SELECT * FROM ${schema}.notifications
        WHERE member_no = $1 ORDER BY created_at DESC`,
        [member_no]
    );
    console.log('notification:', result.rows);
    return result.rows;
};

// 특정 알림 읽음 처리
export const markAsRead = async (notice_id: number): Promise<void> => {
    await db.query(
        "UPDATE team4.notifications SET read_or_not = true WHERE notice_id = $1",
        [notice_id]
    );
};

// 알림 삭제
export const deleteNotification = async (notice_id: number): Promise<void> => {
    await db.query(
        "DELETE FROM team4.notifications WHERE notice_id = $1",
        [notice_id]
    );
};

// 사용자 모든 알림 삭제
export const clearAllNotifications = async (member_no: number): Promise<void> => {
    await db.query(
        "DELETE FROM team4.notifications WHERE member_no = $1",
        [member_no]
    );
};

// 새로운 알림 생성
export const createNotification = async (notification: INotifications): Promise<INotifications> => {
    const result = await db.query(
        "INSERT INTO team4.notifications (notice_message, read_or_not, created_at, member_no, keyword_id) VALUES ($1, $2, NOW(), $3, $4) RETURNING *",
        [
            notification.notice_message,
            notification.read_or_not,
            notification.member_no,
            notification.keyword_id,
        ]
    );
    return result.rows[0];
};
