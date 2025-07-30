import express from "express";
import cors from "cors";
import session from "express-session";

import productsRoutes from "./routes/productsRoutes";
import usersRoutes from "./routes/usersRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import accountRoutes from "./routes/accountRoutes";

const app = express();

// Middleware per la sessione
app.use(
  session({
    secret: "random_secret_room",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 ora
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/e-commerce", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/account", accountRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
