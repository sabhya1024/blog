import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet'

import admin from "firebase-admin";
import {limiter} from './src/lib/rateLimiter.js'
import CONNECT_DB from "./src/config/db.js";

// routes
import authRoutes from "./src/routes/auth.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";

dotenv.config();

// firebase key
if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error("FATAL ERROR: Missing FIREBASE_PRIVATE_KEY");
  process.exit(1);
}

// firebase config
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(limiter);


app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", blogRoutes);


const StartServer = async () => {
  try {
    await CONNECT_DB();
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to DB. Server not started.", error);
    process.exit(1);
  }
};

StartServer();