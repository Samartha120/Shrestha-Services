import multer from "multer";
import path from "path";
import fs from "fs";
import { CONSTANTS } from "../config/constants.js";
import { logger } from "../config/logger.js";
import { Request } from "express";

const uploadDirectory = path.join(process.cwd(), "uploads");

// Auto-create local uploads directory if missing
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueHash = Math.random().toString(36).substring(2, 9);
    cb(null, `${Date.now()}-${uniqueHash}${fileExt}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const isAllowed = CONSTANTS.UPLOAD.ALLOWED_MIME_TYPES.includes(file.mimetype);
  
  if (isAllowed) {
    cb(null, true);
  } else {
    logger.warn(`[Upload Blocked] Rejected upload with unauthorized MIME: ${file.mimetype}`);
    cb(new Error(`File type rejected. Valid types: ${CONSTANTS.UPLOAD.ALLOWED_MIME_TYPES.join(", ")}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: CONSTANTS.UPLOAD.MAX_FILE_SIZE,
  },
});
