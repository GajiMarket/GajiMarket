import React, { useState } from "react";
import axios from "axios";
import loginStore from "../utils/loginStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getNotification = async () => {
  try {
    const memberNo = loginStore.getState().userNo;
    console.log("Member no:", memberNo);
    const response = await api.post(`/notifications?member_no=${memberNo}`); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
}

export const deleteNotification = async (notice_id: number) => {
  try {
    const response = await api.delete(`/notifications/${notice_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete notifications:', error);
    throw error;
  }
}