import express from 'express';
import db from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Create product (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, description, price, category, image, count_in_stock } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO products (name, description, price, category, image, count_in_stock, admin_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, category, image, count_in_stock, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update product (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { name, description, price, category, image, count_in_stock } = req.body;
  try {
    const result = await db.query(
      `UPDATE products SET name=$1, description=$2, price=$3, category=$4, image=$5, count_in_stock=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [name, description, price, category, image, count_in_stock, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM products WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;