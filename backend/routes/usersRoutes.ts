import { Router, Request, Response } from "express";
import db from "../db/db";

const router = Router();

/**
 * @description Get all users with purchases
 * @route GET /api/users
 * @access Public
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      `
        SELECT
          u.user_id,
          u.name AS user_name,
          u.email,
          o.order_id,
          o.order_date,
          p.product_id,
          p.name AS product_name,
          oi.quantity,
          oi.price_at_purchase
        FROM users u
        JOIN orders o ON u.user_id = o.user_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        ORDER BY u.user_id, o.order_date DESC;
        `
    );

    if (!rows) res.status(404).json({ message: "No users found" });
    else res.status(200).json(rows);
  } catch (error) {
    console.error("Errore nel recupero utenti con acquisti:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

export default router;
