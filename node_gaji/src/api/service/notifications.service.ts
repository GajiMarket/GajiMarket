import { logger } from "../../logger";
import {
  getNotificationsByUserId,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
  createNotification,
} from "../DAO/notifications.dao";
import { INotifications } from "../models/notifications.model";

export const notificationService = {
  // 사용자 알림 가져오기
  fetchNotifications: async (member_no: number): Promise<INotifications[]> => 
    executeWithLogging(() => getNotificationsByUserId(member_no), `Fetching notifications for user: ${member_no}`),

  // 특정 알림 읽음 처리
  markNotificationAsRead: async (notice_id: number): Promise<void> => 
    executeWithLogging(() => markAsRead(notice_id), `Marking notification as read: ${notice_id}`),

  // 특정 알림 삭제
  removeNotification: async (notice_id: number): Promise<void> => 
    executeWithLogging(() => deleteNotification(notice_id), `Deleting notification: ${notice_id}`),

  // 사용자 모든 알림 삭제
  clearNotificationsForUser: async (member_no: number): Promise<void> => 
    executeWithLogging(() => clearAllNotifications(member_no), `Clearing all notifications for user: ${member_no}`),

  // 새로운 알림 생성
  addNotification: async (notification: INotifications): Promise<INotifications> => 
    executeWithLogging(
      () => createNotification(notification), 
      `Creating a new notification for user: ${notification.member_no}`
    ),
};

// 공통 로직: 에러 핸들링 및 로깅
async function executeWithLogging<T>(
  action: () => Promise<T>, 
  message: string
): Promise<T> {
  try {
    logger.info(message);
    return await action();
  } catch (error) {
    logger.error(`${message} failed:`, error);
    throw error;
  }
}