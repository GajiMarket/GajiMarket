import { Request, Response } from "express";
import * as NotificationDAO from "../DAO/notifications.dao";

// 사용자 알림 가져오기
export const getNotifications = async (req: Request, res: Response) => {
    const { memberNo } = req.params;
    try {
        const notifications = await NotificationDAO.getNotificationsByUserId(Number(memberNo));
        res.json(notifications);
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
};

// 특정 알림 읽음 처리
export const markNotificationAsRead = async (req: Request, res: Response) => {
    const { noticeId } = req.params;
    try {
        await NotificationDAO.markAsRead(Number(noticeId));
        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Failed to mark notification as read:", error);
        res.status(500).json({ message: "Failed to mark notification as read" });
    }
};

// 특정 알림 삭제
export const deleteNotification = async (req: Request, res: Response) => {
    const { noticeId } = req.params;
    try {
        await NotificationDAO.deleteNotification(Number(noticeId));
        res.json({ message: "Notification deleted" });
    } catch (error) {
        console.error("Failed to delete notification:", error);
        res.status(500).json({ message: "Failed to delete notification" });
    }
};

// 사용자 모든 알림 삭제
export const clearNotifications = async (req: Request, res: Response) => {
    const { memberNo } = req.params;
    try {
        await NotificationDAO.clearAllNotifications(Number(memberNo));
        res.json({ message: "All notifications cleared" });
    } catch (error) {
        console.error("Failed to clear notifications:", error);
        res.status(500).json({ message: "Failed to clear notifications" });
    }
};

// 새로운 알림 생성
export const createNotification = async (req: Request, res: Response) => {
    const { notice_message, read_or_not, member_no, keyword_id } = req.body;
    try {
        const newNotification = await NotificationDAO.createNotification({
            notice_id: 0, // DB에서 자동 생성
            notice_message,
            read_or_not,
            created_at: new Date(), // 현재 시간
            member_no,
            keyword_id,
        });
        res.json(newNotification);
    } catch (error) {
        console.error("Failed to create notification:", error);
        res.status(500).json({ message: "Failed to create notification" });
    }
};