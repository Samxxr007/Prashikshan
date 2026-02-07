import { onRequest } from "firebase-functions/v2/https";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import the Express app
import app from "./src/app.js";

// Export the Express app as a Cloud Function
export const api = onRequest(
    {
        timeoutSeconds: 300,
        memory: "512MiB",
        maxInstances: 10,
    },
    app
);
