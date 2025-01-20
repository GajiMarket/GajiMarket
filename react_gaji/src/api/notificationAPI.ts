import React, { useState } from "react";
import axios from "axios";
import loginStore from "../utils/loginStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const fetchNotifications = async (memberNo: number) => {
  console.log("user num:", memberNo);
    const response = await api.get(`/notifications/${memberNo}`);
    console.log("response data:", response.data);
    return response.data.map((notification: any) => ({
      id: notification.notice_id,
      message: notification.notice_message,
      productId: notification.product_id,
    }));
  };

  export const deleteNotification = async (noticeId: number) => {
    await api.delete(`/notifications/${noticeId}`);
  }

  export const clearAllNotifications = async (memberNo: number) => {
    await api.delete(`/notifications/user/${memberNo}`);
  }