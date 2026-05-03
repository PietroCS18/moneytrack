import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import * as transactionController from "../controllers/transactionController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", transactionController.create);
router.get("/", transactionController.getAll);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.remove);

export default router;