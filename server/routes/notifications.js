import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getDb } from '../database/init.js';

const router = express.Router();

// Get user notifications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const notifications = await db.all(`
      SELECT 
        n.*,
        u.username as triggered_by_username,
        u.avatar as triggered_by_avatar
      FROM notifications n
      LEFT JOIN users u ON n.triggered_by = u.id
      WHERE n.user_id = ?
      ORDER BY n.created_at DESC
      LIMIT 50
    `, [req.user.id]);

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    
    // Check if notification exists and belongs to user
    const notification = await db.get(
      'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await db.run(
      'UPDATE notifications SET read = 1 WHERE id = ?',
      [req.params.id]
    );

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    await db.run(
      'UPDATE notifications SET read = 1 WHERE user_id = ?',
      [req.user.id]
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    
    // Check if notification exists and belongs to user
    const notification = await db.get(
      'SELECT * FROM notifications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await db.run('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;