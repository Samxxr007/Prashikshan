import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix JSON loading in Node ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, "serviceAccount.json");

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const users = db.collection("users");
export const studentProfiles = db.collection("studentProfiles");
export const industryProfiles = db.collection("industryProfiles");
export const projects = db.collection("projects");
