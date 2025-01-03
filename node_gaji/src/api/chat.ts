import express from 'express';
import { db } from '../config/dbConfig';

const router = express.Router();

// 채팅 메시지 조회
router.get('/:id', async (req, res) => {
  const chatId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM messages WHERE chat_id = $1 ORDER BY timestamp ASC', [chatId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// 채팅 메시지 추가
router.post('/:id', async (req, res) => {
  const chatId = req.params.id;
  const { message, sender } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO messages (chat_id, sender, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [chatId, sender, message]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;