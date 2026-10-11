import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { CONSTANTS } from "../config/constants.js";
import { logger } from "../config/logger.js";
import { Request } from "express";

const uploadDirectory = path.join(process.cwd(), "uploads");

// Auto-create local uploads directory if missing
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Extension allowlist paired with the MIME allowlist. A file must satisfy BOTH
// (defence in depth) — a client-set Content-Type alone is never trusted.
const ALLOWED_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif",
  ".pdf", ".zip", ".txt", ".doc", ".docx",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    // Derive a safe extension from the allowlist only — never trust the raw
    // client filename (path traversal / double-extension / null bytes).
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : "";
    const unique = crypto.randomBytes(16).toString("hex");
    cb(null, `${Date.now()}-${unique}${safeExt}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = CONSTANTS.UPLOAD.ALLOWED_MIME_TYPES.includes(file.mimetype);
  const extOk = ALLOWED_EXTENSIONS.has(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    logger.warn(
      `[Upload Blocked] Rejected upload — mime="${file.mimetype}" ext="${ext}"`
    );
    cb(new Error(`File type rejected. Valid types: ${CONSTANTS.UPLOAD.ALLOWED_MIME_TYPES.join(", ")}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: CONSTANTS.UPLOAD.MAX_FILE_SIZE,
    files: 1,
  },
});

