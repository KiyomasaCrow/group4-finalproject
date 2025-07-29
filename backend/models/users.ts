import { RowDataPacket } from "mysql2";
import { Order } from "./order";

export type User = RowDataPacket & {
  user_id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  orders?: Order[];
};
