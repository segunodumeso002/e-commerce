import express from 'express';
import db from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, firstname, lastname, username, email, is_admin FROM users ORDER BY id'
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Edit user (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { firstname, lastname, username, email, is_admin } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET firstname=$1, lastname=$2, username=$3, email=$4, is_admin=$5 WHERE id=$6 RETURNING id, firstname, lastname, username, email, is_admin',
      [firstname, lastname, username, email, is_admin, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id=$1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.json({ message: 'User deleted.' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;