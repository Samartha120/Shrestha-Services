import { Router } from "express";
import { fileController } from "../controllers/fileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { privateUpload } from "../middlewares/uploadMiddleware.js";

const router = Router();

// All file endpoints require authentication.
router.use(authMiddleware as any);

router.get("/", fileController.list as any);
router.post("/", privateUpload.single("file"), fileController.upload as any);
router.get("/:id/download", fileController.download as any);
router.delete("/:id", fileController.delete as any);

export default router;
