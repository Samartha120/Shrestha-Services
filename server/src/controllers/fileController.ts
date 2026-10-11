import { Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { PRIVATE_UPLOAD_DIR } from "../middlewares/uploadMiddleware.js";
import { sniff, expectedCategory } from "../utils/fileSignature.js";

const legacyPublicDir = path.join(process.cwd(), "uploads");

// Resolve a stored file to a real path WITHIN an allowed dir (no traversal).
function resolveDiskPath(fileUrl: string): string | null {
  // Stored as "private:<name>" (new) or "/uploads/<name>" (legacy).
  const cleaned = fileUrl.replace(/^private:/, "");
  const base = path.basename(cleaned); // strips any directory component
  const priv = path.join(PRIVATE_UPLOAD_DIR, base);
  if (fs.existsSync(priv)) return priv;
  const legacy = path.join(legacyPublicDir, base);
  if (fs.existsSync(legacy)) return legacy;
  return null;
}

const PRIVILEGED = ["admin", "superadmin"];

export const fileController = {
  // List the authenticated user's standalone design-file uploads.
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const files = await prisma.fileUpload.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json({ status: "success", data: { files } });
    } catch (err) {
      next(err);
    }
  },

  // Store an uploaded design file (private storage) against the user.
  upload: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ status: "error", message: "No file was provided" });
        return;
      }

      // Content-based validation: the bytes must match the declared type.
      const diskPath = path.join(PRIVATE_UPLOAD_DIR, req.file.filename);
      const fd = await fs.promises.open(diskPath, "r");
      const { buffer } = await fd.read(Buffer.alloc(16), 0, 16, 0);
      await fd.close();
      const expected = expectedCategory(req.file.mimetype);
      const actual = sniff(buffer);
      // Reject only on a positive mismatch (text/.doc have no reliable magic).
      if (expected && actual && expected !== actual) {
        await fs.promises.unlink(diskPath).catch(() => {});
        logger.warn(`[Upload Blocked] Signature mismatch: declared ${req.file.mimetype}, sniffed ${actual}`);
        res.status(400).json({ status: "error", message: "File content does not match its type." });
        return;
      }

      const file = await prisma.fileUpload.create({
        data: {
          fileName: req.file.originalname,
          // Private marker — not a servable URL; downloads go through the route below.
          fileUrl: `private:${req.file.filename}`,
          fileType: req.file.mimetype,
          fileSize: `${(req.file.size / 1024).toFixed(1)} KB`,
          userId: req.user!.id,
        },
      });

      logger.info(`[File Upload] User: ${req.user!.id} uploaded ${req.file.originalname}`);
      res.status(201).json({ status: "success", data: { file } });
    } catch (err) {
      next(err);
    }
  },

  // Authorized download — owner or privileged staff only. Streams from private
  // storage (or the legacy public dir for pre-migration records).
  download: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const file = await prisma.fileUpload.findUnique({ where: { id } });
      if (!file) {
        res.status(404).json({ status: "error", message: "File not found" });
        return;
      }
      const privileged = PRIVILEGED.includes(req.user!.role);
      if (!privileged && file.userId !== req.user!.id) {
        res.status(403).json({ status: "error", message: "You do not have access to this file" });
        return;
      }
      const disk = resolveDiskPath(file.fileUrl);
      if (!disk) {
        res.status(404).json({ status: "error", message: "File is no longer available" });
        return;
      }
      res.setHeader("Content-Type", file.fileType || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(file.fileName)}"`);
      fs.createReadStream(disk).pipe(res);
    } catch (err) {
      next(err);
    }
  },

  // Delete one of the authenticated user's files (owner-scoped) + the disk copy.
  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const file = await prisma.fileUpload.findFirst({
        where: { id, userId: req.user!.id },
      });
      if (!file) {
        res.status(404).json({ status: "error", message: "File not found" });
        return;
      }
      const disk = resolveDiskPath(file.fileUrl);
      if (disk) {
        await fs.promises.unlink(disk).catch(() => {
          logger.warn(`[File Delete] Disk file missing for ${file.fileUrl}`);
        });
      }
      await prisma.fileUpload.delete({ where: { id: file.id } });
      res.status(200).json({ status: "success", message: "File deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
