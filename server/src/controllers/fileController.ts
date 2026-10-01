import { Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

const uploadDirectory = path.join(process.cwd(), "uploads");

export const fileController = {
  // List the authenticated user's standalone design-file uploads.
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }

      const files = await prisma.fileUpload.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ status: "success", data: { files } });
    } catch (err) {
      next(err);
    }
  },

  // Store an uploaded design file against the authenticated user.
  upload: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }

      if (!req.file) {
        res.status(400).json({ status: "error", message: "No file was provided" });
        return;
      }

      const file = await prisma.fileUpload.create({
        data: {
          fileName: req.file.originalname,
          fileUrl: `/uploads/${req.file.filename}`,
          fileType: req.file.mimetype,
          fileSize: `${(req.file.size / 1024).toFixed(1)} KB`,
          userId: req.user.id,
        },
      });

      logger.info(`[File Upload] User: ${req.user.id} uploaded ${req.file.originalname}`);
      res.status(201).json({ status: "success", data: { file } });
    } catch (err) {
      next(err);
    }
  },

  // Delete one of the authenticated user's files (owner-scoped) + the disk copy.
  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }

      const { id } = req.params;
      const file = await prisma.fileUpload.findFirst({
        where: { id, userId: req.user.id },
      });

      if (!file) {
        res.status(404).json({ status: "error", message: "File not found" });
        return;
      }

      // Remove the physical file (best effort — DB record is the source of truth).
      const diskPath = path.join(uploadDirectory, path.basename(file.fileUrl));
      fs.promises.unlink(diskPath).catch(() => {
        logger.warn(`[File Delete] Disk file missing for ${file.fileUrl}`);
      });

      await prisma.fileUpload.delete({ where: { id: file.id } });

      res.status(200).json({ status: "success", message: "File deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
