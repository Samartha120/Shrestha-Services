import { Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { quoteService } from "../services/quoteService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { PRIVATE_UPLOAD_DIR } from "../middlewares/uploadMiddleware.js";

const legacyPublicDir = path.join(process.cwd(), "uploads");

// Resolve a stored attachment to a real path within an allowed dir (no traversal).
function resolveDiskPath(fileUrl: string): string | null {
  const cleaned = fileUrl.replace(/^private:/, "");
  const base = path.basename(cleaned);
  const priv = path.join(PRIVATE_UPLOAD_DIR, base);
  if (fs.existsSync(priv)) return priv;
  const legacy = path.join(legacyPublicDir, base);
  if (fs.existsSync(legacy)) return legacy;
  return null;
}

export const quoteController = {
  submit: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }
      // Bind the quote to the authenticated user — the client cannot submit
      // under someone else's identity (ownership is keyed on email).
      const quote = await quoteService.submit(req.body, req.file, {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
      });
      res.status(201).json({ status: "success", data: { quote } });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }

      let quotes;
      if (req.user.role === "admin" || req.user.role === "superadmin") {
        quotes = await quoteService.getAll();
      } else {
        quotes = await quoteService.getByEmail(req.user.email);
      }

      res.status(200).json({ status: "success", data: { quotes } });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }

      const { id } = req.params;
      const quote = await quoteService.getById(id);
      if (!quote) {
        res.status(404).json({ status: "error", message: "Quote not found" });
        return;
      }

      // Ownership enforcement: a customer may only view their own quotes
      // (matched by email). Admins and superadmins may view any quote.
      const isPrivileged =
        req.user.role === "admin" || req.user.role === "superadmin";
      if (!isPrivileged && quote.email !== req.user.email) {
        res.status(403).json({ status: "error", message: "You do not have access to this quote" });
        return;
      }

      res.status(200).json({ status: "success", data: quote });
    } catch (err) {
      next(err);
    }
  },

  // Authorized attachment download — the quote owner (matched by email) or
  // privileged staff only. Streams from private storage.
  downloadFile: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }
      const { id } = req.params;
      const quote = await quoteService.getById(id);
      if (!quote || !quote.fileUrl) {
        res.status(404).json({ status: "error", message: "Attachment not found" });
        return;
      }
      const privileged = req.user.role === "admin" || req.user.role === "superadmin";
      if (!privileged && quote.email !== req.user.email) {
        res.status(403).json({ status: "error", message: "You do not have access to this file" });
        return;
      }
      const disk = resolveDiskPath(quote.fileUrl);
      if (!disk) {
        res.status(404).json({ status: "error", message: "File is no longer available" });
        return;
      }
      res.setHeader("Content-Type", quote.fileType || "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(path.basename(disk))}"`);
      fs.createReadStream(disk).pipe(res);
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, priceOverride } = req.body;
      const quote = await quoteService.updateStatus(id, status, priceOverride);
      res.status(200).json({ status: "success", data: { quote } });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await quoteService.delete(id);
      res.status(200).json({ status: "success", message: "Quote request successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
