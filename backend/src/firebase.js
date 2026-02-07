import admin from "firebase-admin";

// Initialize Firebase Admin
// In Cloud Functions, default credentials are automatically available
// For local development, ensure GOOGLE_APPLICATION_CREDENTIALS is set
// or serviceAccount.json exists in the src directory
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || "prashikshan-b6986";

  try {
    const serviceAccountPath = path.join(__dirname, "serviceAccount.json");

    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId
      });
      console.log("Firebase Admin initialized with serviceAccount.json");
    } else {
      // In production (Cloud Functions) or if no service account file, use default credentials
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: projectId
      });
      console.log("Firebase Admin initialized with Application Default Credentials");
    }
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error.message);
    // Attempt to initialize with just project ID as a last resort (works in some GCP envs)
    try {
      if (!admin.apps.length) {
        admin.initializeApp({ projectId });
        console.log("Firebase Admin initialized with Project ID only (fallback)");
      }
    } catch (e) {
      console.error("Critical: Failed to initialize Firebase Admin fallback:", e.message);
    }
  }
}

export const db = admin.firestore();

// Helper to check if database is ready - causing issues in production, now a no-op or simple log
export const checkDbReady = () => {
  // In production, we assume readiness. In dev, we can log if missing creds but shouldn't crash.
  const serviceAccountPath = path.join(__dirname, "serviceAccount.json");
  if (!fs.existsSync(serviceAccountPath)) {
    console.warn("Notice: serviceAccount.json not found. Using default credentials. This is expected in production.");
  }
};

export const users = db.collection("users");
export const studentProfiles = db.collection("studentProfiles");
export const industryProfiles = db.collection("industryProfiles");
export const projects = db.collection("projects");
