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
    origin: [
      "http://localhost:3000",
      "https://renew-cred-cms-git-main-devendradev44s-projects.vercel.app",
      "https://renew-cred-cms.vercel.app", // if this becomes your production domain
      "https://renew-cred-cms-flax.vercel.app/",
      "https://renew-cred-chlhyj40w-devendradev44s-projects.vercel.app",
    ],
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

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/media", mediaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});