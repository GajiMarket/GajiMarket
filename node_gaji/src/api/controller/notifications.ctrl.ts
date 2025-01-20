import { Request, Response } from "express";
import * as NotificationDAO from "../DAO/notifications.dao";

// 공통 에러 처리 함수
const handleRequest = async (
  action: () => Promise<any>,
  res: Response,
  successMessage?: string
) => {
  try {
    const result = await action();
    res.json(successMessage ? { message: successMessage, result } : result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

// 사용자 알림 가져오기
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  const memberNo = parseInt(req.params.member_no, 10) // 문자열에서 정수로 변환
  console.log("Fetching notifications for memberNo:", memberNo); // 입력값 로그

  if (isNaN(memberNo)) {
    console.error("Invalid memberNo:", req.params.member_no);
    res.status(400).json({ message: "Invalid member_no. It must be an integer." });
  }

  handleRequest(
    () => NotificationDAO.getNotificationsByUserId(memberNo), res
  );
};



// 특정 알림 읽음 처리
export const markNotificationAsRead = (req: Request, res: Response) =>
  handleRequest(
    () => NotificationDAO.markAsRead(Number(req.params.noticeId)),
    res,
    "Notification marked as read"
  );

// 특정 알림 삭제
export const deleteNotification = (req: Request, res: Response) =>
  handleRequest(
    () => NotificationDAO.deleteNotification(Number(req.params.noticeId)),
    res,
    "Notification deleted"
  );

// 사용자 모든 알림 삭제
export const clearNotifications = (req: Request, res: Response) =>
  handleRequest(
    () => NotificationDAO.clearAllNotifications(Number(req.params.memberNo)),
    res,
    "All notifications cleared"
  );

// 새로운 알림 생성
export const createNotification = (req: Request, res: Response) =>
  handleRequest(
    () =>
      NotificationDAO.createNotification({
        notice_id: 0, // DB에서 자동 생성
        notice_message: req.body.notice_message,
        read_or_not: req.body.read_or_not,
        created_at: new Date(), // 현재 시간
        member_no: req.body.member_no,
        keyword_id: req.body.keyword_id,
      }),
    res
  );
