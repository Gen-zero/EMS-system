import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getDb } from '../database/init.js';

const router = express.Router();

// Get task comments
router.get('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const comments = await db.all(`
      SELECT 
        tc.*,
        u.username,
        u.avatar
      FROM task_comments tc
      JOIN users u ON tc.user_id = u.id
      WHERE tc.task_id = ?
      ORDER BY tc.created_at DESC
    `, [req.params.id]);

    res.json(comments);
  } catch (error) {
    console.error('Get task comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add task comment
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const db = await getDb();

    // Insert comment
    const result = await db.run(`
      INSERT INTO task_comments (task_id, user_id, content)
      VALUES (?, ?, ?)
    `, [req.params.id, req.user.id, content]);

    // Get task assignees for notifications
    const assignees = await db.all(`
      SELECT user_id 
      FROM task_assignees 
      WHERE task_id = ? AND user_id != ?
    `, [req.params.id, req.user.id]);

    // Create notifications for other assignees
    if (assignees.length > 0) {
      const notificationValues = assignees.map(({ user_id }) => 
        `(${user_id}, 'task_comment', 'New Comment', 'New comment on your task', ${req.params.id}, ${req.user.id})`
      ).join(',');

      await db.run(`
        INSERT INTO notifications (
          user_id, type, title, message, task_id, triggered_by
        )
        VALUES ${notificationValues}
      `);
    }

    const comment = await db.get(`
      SELECT 
        tc.*,
        u.username,
        u.avatar
      FROM task_comments tc
      JOIN users u ON tc.user_id = u.id
      WHERE tc.id = ?
    `, [result.lastID]);

    res.status(201).json(comment);
  } catch (error) {
    console.error('Add task comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add result link
router.post('/:id/result', authenticateToken, async (req, res) => {
  try {
    const { resultLink } = req.body;
    const db = await getDb();

    // Update task with result link
    await db.run(`
      UPDATE tasks 
      SET result_link = ?
      WHERE id = ?
    `, [resultLink, req.params.id]);

    // Add activity
    await db.run(`
      INSERT INTO task_activities (
        task_id, user_id, type, content, result_link
      )
      VALUES (?, ?, ?, ?, ?)
    `, [req.params.id, req.user.id, 'result', 'Added result link', resultLink]);

    // Get task assignees for notifications
    const assignees = await db.all(`
      SELECT user_id 
      FROM task_assignees 
      WHERE task_id = ? AND user_id != ?
    `, [req.params.id, req.user.id]);

    // Create notifications for other assignees
    if (assignees.length > 0) {
      const notificationValues = assignees.map(({ user_id }) => 
        `(${user_id}, 'task_result', 'Task Result Added', 'A result has been added to your task', ${req.params.id}, ${req.user.id})`
      ).join(',');

      await db.run(`
        INSERT INTO notifications (
          user_id, type, title, message, task_id, triggered_by
        )
        VALUES ${notificationValues}
      `);
    }

    res.json({ message: 'Result link added successfully' });
  } catch (error) {
    console.error('Add result link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rest of the existing routes...