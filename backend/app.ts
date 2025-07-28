import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes";
import usersRoutes from "./routes/usersRoutes";
import ordersRoutes from "./routes/ordersRoutes";

const app = express();

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
