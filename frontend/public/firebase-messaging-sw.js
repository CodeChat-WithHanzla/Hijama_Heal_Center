importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBFxMTk5_MJ-NcuMIfHYCIuQBGFMmc_3FE",
  authDomain: "pushnotification-9c750.firebaseapp.com",
  projectId: "pushnotification-9c750",
  storageBucket: "pushnotification-9c750.appspot.com",
  messagingSenderId: "914772903275",
  appId: "1:914772903275:web:1df00c6e0d52a195a6f82e"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.image || "/logo.svg"
  });
});
