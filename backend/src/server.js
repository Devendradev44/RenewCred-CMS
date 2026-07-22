import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      // Allow localhost and any Vercel deployment
      if (
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RenewCred CMS API is running 🚀",
  });
});

app.get("/api/debug-cors", (req, res) => {
  res.json({
    origin: req.headers.origin,
    allowedOrigins: [
      "http://localhost:3000",
      "https://renew-cred-cms-git-main-devendradev44s-projects.vercel.app",
      "https://renew-cred-cms.vercel.app",
      "https://renew-cred-cms-flax.vercel.app",
      "https://renew-cred-chlhyj40w-devendradev44s-projects.vercel.app",
    ],
    env: process.env.NODE_ENV,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/media", mediaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});