import { RowDataPacket } from "mysql2";

export type Order = RowDataPacket & {
  order_id: number;
  user_id: number;
  order_date: Date;
  total: number;
};
