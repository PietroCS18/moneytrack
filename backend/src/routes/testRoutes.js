import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/private", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando",
    userId: req.userId,
  });
});

export default router;