import { Router, Request, Response } from "express";
import { Product } from "../models/product";
import db from "../db/db";

const router = Router();

/**
 * @description Get all products
 * @route GET /api/e-commerce/products
 * @access Public
 */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<Product[]>("SELECT * FROM products");

    if (rows.length > 0) res.status(200).json(rows);
    else res.status(404).json({ message: "No products found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

/**
 * @description Create a new product
 * @route POST /api/e-commerce/product
 * @access Public
 */
router.post("/product", async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)",
      [name, description, price, quantity]
    );

    if (req.body.length > 0) res.status(200).json(result);
    else res.status(404).json({ message: "Error creating product" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

export default router;
