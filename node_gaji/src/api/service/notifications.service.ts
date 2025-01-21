import {logger} from "../../logger";
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
    fetchNotifications: async (member_no: number): Promise<INotifications[]> => {
        try {
            logger.info(`Fetching notifications for user: ${member_no}`);
            const notifications = await getNotificationsByUserId(member_no);
            if (!notifications.length) {
                logger.info(`No notifications found for user: ${member_no}`);
            }
            return notifications;
        } catch (error) {
            logger.error("Failed to fetch notifications:", error);
            throw error;
        }
    },

    // 특정 알림 읽음 처리
    markNotificationAsRead: async (notice_id: number): Promise<void> => {
        try {
            logger.info(`Marking notification as read: ${notice_id}`);
            await markAsRead(notice_id);
        } catch (error) {
            logger.error("Failed to mark notification as read:", error);
            throw error;
        }
    },

    // 특정 알림 삭제
    removeNotification: async (notice_id: number): Promise<void> => {
        try {
            logger.info(`Deleting notification: ${notice_id}`);
            await deleteNotification(notice_id);
        } catch (error) {
            logger.error("Failed to delete notification:", error);
            throw error;
        }
    },

    // 사용자 모든 알림 삭제
    clearNotificationsForUser: async (member_no: number): Promise<void> => {
        try {
            logger.info(`Clearing all notifications for user: ${member_no}`);
            await clearAllNotifications(member_no);
        } catch (error) {
            logger.error("Failed to clear notifications for user:", error);
            throw error;
        }
    },

    // 새로운 알림 생성
    addNotification: async (notification: INotifications): Promise<INotifications> => {
        try {
            logger.info(`Creating a new notification for user: ${notification.member_no}`);
            const createdNotification = await createNotification(notification);
            return createdNotification;
        } catch (error) {
            logger.error("Failed to create notification:", error);
            throw error;
        }
    },
};