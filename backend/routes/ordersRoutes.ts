import { Router, Request, Response } from "express";
import db from "../db/db";

const router = Router();

/**
 * @description Get all orders for a user
 * @route GET /api/orders/:id
 * @access Public
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

    const [rows] = await db.query(
      `
          SELECT
          u.name AS user_name,
          p.name AS product_name,
          oi.quantity,
          oi.price_at_purchase,
          o.order_date
        FROM users u
        JOIN orders o ON u.user_id = o.user_id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE u.user_id = ?;
        `,
      [id]
    );

    if (!rows) res.status(404).json({ message: "No orders found" });
    else res.status(200).json(rows);
  } catch (error) {
    console.error("Errore nel recupero ordini dell'utente:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

export default router;
