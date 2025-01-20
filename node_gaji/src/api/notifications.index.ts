import express from "express";
import { getNotifications, markAsRead } from "./controller/notifications.ctrl";

const router = express.Router();

router.get('/', getNotifications);
router.patch('/:id', markAsRead);

export default router;