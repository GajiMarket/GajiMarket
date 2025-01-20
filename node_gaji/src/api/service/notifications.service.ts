import { getNotificationsByMember, updateNotificationReadStatus } from "../DAO/notifications.dao";
import { INotifications } from "../models/notifications.model";

export const fetchNotifications = async (memberNo: number): Promise<INotifications[]> => {
  return await getNotificationsByMember(memberNo);
};

export const markNotificationAsRead = async (notificationId: number): Promise<void> => {
  await updateNotificationReadStatus(notificationId);
};