import { Request, Response } from "express";
import { fetchNotifications, markNotificationAsRead } from "../service/notifications.service";

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  const memberNo = parseInt(req.query.member_no as string, 10);
  if (isNaN(memberNo)) {
    res.status(400).json({ message: "유효한 member_no를 입력하세요." });
    return;
  }

  try {
    const notifications = await fetchNotifications(memberNo);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "알림 조회 중 오류가 발생했습니다." });
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  const notificationId = parseInt(req.params.id, 10);
  if (isNaN(notificationId)) {
    res.status(400).json({ message: "유효한 알림 ID를 입력하세요." });
    return;
  }

  try {
    await markNotificationAsRead(notificationId);
    res.status(200).json({ message: "알림이 읽음 처리되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "알림 읽음 처리 중 오류가 발생했습니다." });
  }
};