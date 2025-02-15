import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Replacing \n properly in private key
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const sendNotification = async (req, res) => {
  console.log("Notification service started");
  const { fcmToken, title, body } = req.body;

  if (!fcmToken || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const message = {
    notification: {
      title: title,
      body: body
    },
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return res.status(200).json({ message: "Notification sent", response });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
};

export default sendNotification;
