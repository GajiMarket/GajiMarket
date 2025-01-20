import { Request, Response } from "express";
import { fetchNotifications, markNotificationAsRead } from "../service/notifications.service";
import { INotifications } from "../models/notifications.model";

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  const memberNo = parseInt(req.query.member_no as string, 10);
  console.log("member no:", memberNo);

  if (!memberNo) {
    res.status(400).json({ message: 'member no is required' });
    return;
  }

  try {
    const notifications = await fetchNotifications(memberNo);
    console.log("Get Notifications:", notifications);
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
}

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Notification ID is required' });
    return;
  }

  try {
    await markNotificationAsRead(parseInt(id, 10));
    res.status(200).json({ message: 'Notification marked as read' })
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
}