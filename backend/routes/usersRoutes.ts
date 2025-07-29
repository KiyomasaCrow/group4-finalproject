import { Router, Request, Response } from "express";
import db from "../db/db";
import { User } from "../models/users";

const router = Router();

/**
 * @description Get all users with purchases
 * @route GET /api/users/purchases
 * @access Public
 */
router.get("/purchases", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<User[]>(
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

    if (!rows || rows.length === 0)
      res.status(404).json({ message: "Nessun acquisto trovato" });

    const groupedUsers: Record<number, any> = {};

    rows.forEach((row) => {
      const userId = row.user_id;

      if (!groupedUsers[userId]) {
        groupedUsers[userId] = {
          id: row.user_id,
          name: row.user_name,
          email: row.email,
          orders: [],
        };
      }

      groupedUsers[userId].orders.push({
        id: row.order_id,
        productId: row.product_id,
        productName: row.product_name,
        quantity: row.quantity,
        price: row.price_at_purchase,
        orderDate: row.order_date,
      });
    });

    const result = Object.values(groupedUsers);
    res.status(200).json(result);
  } catch (error) {
    console.error("Errore nel recupero utenti con acquisti:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

/**
 * @description Get user by ID
 * @route GET /api/users/:id
 * @access Public
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID non valido" });

  try {
    const [rows] = await db.query<User[]>(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    if (rows.length > 0) res.status(200).json(rows[0]);
    else res.status(404).json({ message: "Utente non trovato" });
  } catch (error) {
    console.error("Errore nel recupero dell'utente:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

export default router;
