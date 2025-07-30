import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../db/db";
import { User } from "../models/users";

const router: Router = Router();

/**
 * @description Creazione dell'utente
 * @route POST /api/account/sign-in
 * @access Public
 */
router.post("/sign-in", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Tutti i campi sono obbligatori" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query<User[]>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const insertId: number = (result as any).insertId;

    res.status(201).json({
      message: "Utente creato con successo",
      user: {
        id: insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Errore nella creazione dell'utente:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

/**
 * @description Login dell'utente
 * @route POST /api/account/login
 * @access Public
 */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email e password obbligatorie" });

  try {
    const [rows] = await db.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if ((rows as any[]).length === 0)
      return res.status(401).json({ message: "Utente non trovato" });

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Password errata" });

    req.session.user = {
      id: user.user_id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      message: "Login effettuato",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Errore nel login:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

/**
 * @description Logout dell'utente
 * @route POST /api/account/logout
 * @access Private
 */
router.post("/logout", async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Errore nella distruzione della sessione:", err);
      return res.status(500).json({ message: "Errore nel logout" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout effettuato" });
  });
});

/**
 * @description Verifica se l'utente è autenticato
 * @route GET /api/account/me
 * @access Private
 */
router.get("/me", (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false, message: "Non autenticato" });
  }
});

export default router;
