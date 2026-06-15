export const CONSTANTS = {
  UPLOAD: {
    MAX_FILE_SIZE: 15 * 1024 * 1024, // 15 Megabytes
    ALLOWED_MIME_TYPES: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  AUTH: {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 Minutes lockout window
  },
};
