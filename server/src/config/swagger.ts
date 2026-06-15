import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Shrestha Services API Documentation",
    version: "1.0.0",
    description: "Enterprise backend API endpoints for Shrestha Services Pvt. Ltd.",
  },
  servers: [
    {
      url: "/api/v1",
      description: "Root endpoint",
    },
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login a user",
        description: "Returns access and refresh tokens along with user details.",
        responses: {
          200: { description: "Successful login" },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Register a customer",
        description: "Creates a new user with the default customer role.",
        responses: {
          201: { description: "Successful registration" },
        },
      },
    },
  },
};

export const setupSwagger = (app: Express) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
