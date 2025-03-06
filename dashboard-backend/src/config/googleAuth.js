import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Path to Google service account credentials
const credentialsPath = path.resolve("src/config/google-credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export { auth }; // ✅ Correctly exported as a named export
