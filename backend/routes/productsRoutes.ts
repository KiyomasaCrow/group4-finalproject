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
 * @description Get a product by name
 * @route GET /api/e-commerce/products/:name
 * @access Public
 */
router.get("/products/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    if (!name) return res.status(400).json({ message: "Invalid product name" });

    const [rows] = await db.query<Product[]>(
      "SELECT * FROM products WHERE name = ?",
      [name]
    );

    if (rows.length > 0) res.status(200).json(rows[0]);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching product" });
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
    const [result] = await db.query<Product[]>(
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

/**
 * @description Update a product
 * @route PUT /api/e-commerce/product/:id
 * @access Public
 */
router.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, quantity } = req.body;

    if (isNaN(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const [result] = await db.query<Product[]>(
      "UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE product_id = ?",
      [name, description, price, quantity, id]
    );

    if (req.body.length === 0)
      res.status(404).json({ message: "Error updating product" });
    else res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product" });
  }
});

/**
 * @description Delete a product
 * @route DELETE /api/e-commerce/product/:id
 * @access Public
 */
router.delete("/product/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const [result] = await db.query<Product[]>(
      "DELETE FROM products WHERE product_id = ?",
      [id]
    );

    if (!id) res.status(404).json({ message: "Error deleting product" });
    else res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;
