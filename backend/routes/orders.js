import express from 'express';
import db from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Place order (user)
router.post('/', authenticate, async (req, res) => {
  const { items, total_price } = req.body; // items: [{product_id, quantity}]
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order items required.' });
  }
  try {
    const orderResult = await db.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *',
      [req.user.id, total_price]
    );
    const order = orderResult.rows[0];
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
        [order.id, item.product_id, item.quantity]
      );
    }
    res.status(201).json(order);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get user's orders
router.get('/my', authenticate, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Admin: Get all orders
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Admin: Confirm/complete order
router.put('/:id/confirm', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE orders SET status='completed' WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found.' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;