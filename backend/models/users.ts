import { RowDataPacket } from "mysql2";

export type User = RowDataPacket & {
  user_id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};
