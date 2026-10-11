import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { CONSTANTS } from "../config/constants.js";
import { logger } from "../config/logger.js";
import { Request } from "express";

const uploadDirectory = path.join(process.cwd(), "uploads");
// Private artwork (customer design files, quote attachments) lives OUTSIDE the
// statically-served `uploads` dir and is reachable only through authorized,
// ownership-checked download routes.
export const PRIVATE_UPLOAD_DIR = path.join(process.cwd(), "private_uploads");

// Auto-create local uploads directories if missing
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
if (!fs.existsSync(PRIVATE_UPLOAD_DIR)) {
  fs.mkdirSync(PRIVATE_UPLOAD_DIR, { recursive: true });
}

// Extension allowlist paired with the MIME allowlist. A file must satisfy BOTH
// (defence in depth) — a client-set Content-Type alone is never trusted.
const ALLOWED_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif",
  ".pdf", ".zip", ".txt", ".doc", ".docx",
]);

const makeFilename = (file: Express.Multer.File): string => {
  // Derive a safe extension from the allowlist only — never trust the raw
  // client filename (path traversal / double-extension / null bytes).
  const ext = path.extname(file.originalname).toLowerCase();
  const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : "";
  const unique = crypto.randomBytes(16).toString("hex");
  return `${Date.now()}-${unique}${safeExt}`;
};

const makeStorage = (dir: string) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => cb(null, makeFilename(file)),
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

const limits = { fileSize: CONSTANTS.UPLOAD.MAX_FILE_SIZE, files: 1 };

// Public marketing assets (admin-managed gallery/project/service/blog images).
export const upload = multer({ storage: makeStorage(uploadDirectory), fileFilter, limits });

// Private customer artwork — served only via authorized download routes.
export const privateUpload = multer({ storage: makeStorage(PRIVATE_UPLOAD_DIR), fileFilter, limits });

