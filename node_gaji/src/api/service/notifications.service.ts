import { createNotification, getNotificationsByMember, updateNotificationReadStatus } from "../DAO/notifications.dao";
import { notifyClient } from "config/websocket";
import { INotifications } from "../models/notifications.model";

export const fetchNotifications = async (memberNo: number): Promise<INotifications[]> => {
  const notifications = await getNotificationsByMember(memberNo);
  return notifications;
}

export const markNotificationAsRead = async (id: number): Promise<void> => {
  await updateNotificationReadStatus(id);
};

export const sendNotification = async (message: string, memberNo: number, keywordId: number, productId: number): Promise<void> => {
  await createNotification(message, memberNo, keywordId, productId);
  notifyClient(memberNo.toString(), message);
};