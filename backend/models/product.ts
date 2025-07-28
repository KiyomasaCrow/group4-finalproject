import { RowDataPacket } from "mysql2";

export type Product = RowDataPacket & {
  product_id: number; // ID auto-incrementale
  name: string; // Nome del prodotto
  description: string; // Descrizione testuale
  price: number; // Prezzo con decimali (DECIMAL(10,2))
  quantity: number; // Quantità disponibile
  created_at: string;
  updated_at: string;
};
