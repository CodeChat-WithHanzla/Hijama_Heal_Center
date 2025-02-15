import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ Function to get token
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Notification Permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      //console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export { messaging, getToken, onMessage };
