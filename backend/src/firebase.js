import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!admin.apps.length) {
  if (
    serviceAccount.projectId &&
    serviceAccount.clientEmail &&
    serviceAccount.privateKey
  ) {
    // ✅ Render / Production
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("✅ Firebase Admin initialized using ENV service account");
  } else {
    // ✅ Local fallback (optional)
    admin.initializeApp();
    console.log("⚠️ Firebase initialized with default credentials (local only)");
  }
}

export const db = admin.firestore();

// Collections
export const users = db.collection("users");
export const studentProfiles = db.collection("studentProfiles");
export const industryProfiles = db.collection("industryProfiles");
export const projects = db.collection("projects");

export default admin;
