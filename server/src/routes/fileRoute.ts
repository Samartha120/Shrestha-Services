import { Router } from "express";
import { fileController } from "../controllers/fileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = Router();

// All file endpoints require authentication.
router.use(authMiddleware as any);

router.get("/", fileController.list as any);
router.post("/", upload.single("file"), fileController.upload as any);
router.delete("/:id", fileController.delete as any);

export default router;
