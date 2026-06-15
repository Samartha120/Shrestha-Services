import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Config & Swagger
import { env } from "./config/env.js";
import { setupSwagger } from "./config/swagger.js";
import { logger } from "./config/logger.js";

// Middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

// Routes
import authRoute from "./routes/authRoute.js";
import quoteRoute from "./routes/quoteRoute.js";
import orderRoute from "./routes/orderRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import projectRoute from "./routes/projectRoute.js";
import galleryRoute from "./routes/galleryRoute.js";
import settingsRoute from "./routes/settingsRoute.js";
import inquiryRoute from "./routes/inquiryRoute.js";
import testimonialRoute from "./routes/testimonialRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import adminRoute from "./routes/adminRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Base Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: true, // Allow all origins for dev, or specify hosts in production
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging (Morgan wrapped with Winston)
const morganStream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: morganStream }));

// Rate Limiting
app.use("/api/", apiLimiter);

// Serve uploads directory static assets
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger Documentation
setupSwagger(app);

// Mount routes under /api/v1
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/quotes", quoteRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/gallery", galleryRoute);
app.use("/api/v1/settings", settingsRoute);
app.use("/api/v1/inquiries", inquiryRoute);
app.use("/api/v1/testimonials", testimonialRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/admin", adminRoute);

// Catch 404 routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: "error", message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use(errorMiddleware as any);

export default app;
export { app };
