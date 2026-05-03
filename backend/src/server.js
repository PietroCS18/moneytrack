import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.use("/auth", authRoutes);

app.use("/test", testRoutes);

app.use("/transactions", transactionRoutes);
