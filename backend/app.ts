import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes";

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
