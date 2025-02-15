# Firebase Cloud Messaging (FCM) Notification Service Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Introduction](#1-introduction)
* [2. Setup and Initialization](#2-setup-and-initialization)
    * [2.1. Environment Variables](#21-environment-variables)
    * [2.2. Firebase Initialization](#22-firebase-initialization)
* [3. `sendNotification` Function](#3-sendnotification-function)
    * [3.1. Function Parameters](#31-function-parameters)
    * [3.2. Input Validation](#32-input-validation)
    * [3.3. Message Construction](#33-message-construction)
    * [3.4. Sending the Notification](#34-sending-the-notification)
    * [3.5. Error Handling](#35-error-handling)


## 1. Introduction

This document details the implementation of a serverless function, `sendNotification`,  that utilizes the Firebase Admin SDK to send push notifications via Firebase Cloud Messaging (FCM).  The function receives a request containing the FCM token, notification title, and body, and sends the notification to the specified device.


## 2. Setup and Initialization

### 2.1. Environment Variables

The service utilizes environment variables to securely manage Firebase credentials. These variables must be set before running the application.  The variables are:

| Variable Name                     | Description                                                                     |
|--------------------------------------|---------------------------------------------------------------------------------|
| `FIREBASE_PRIVATE_KEY`           | Firebase service account private key.  **Important:**  Newlines (`\n`) are handled correctly by replacing `\\n` with `\n`. |
| `FIREBASE_TYPE`                    | Type of Firebase service account.                                                |
| `FIREBASE_PROJECT_ID`             | Firebase project ID.                                                             |
| `FIREBASE_PRIVATE_KEY_ID`         | Firebase private key ID.                                                         |
| `FIREBASE_CLIENT_EMAIL`           | Firebase client email.                                                          |
| `FIREBASE_CLIENT_ID`              | Firebase client ID.                                                             |
| `FIREBASE_AUTH_URI`                | Firebase authentication URI.                                                      |
| `FIREBASE_TOKEN_URI`               | Firebase token URI.                                                             |
| `FIREBASE_AUTH_PROVIDER_CERT_URL` | Firebase authentication provider certificate URL.                               |
| `FIREBASE_CLIENT_CERT_URL`        | Firebase client certificate URL.                                                 |
| `FIREBASE_UNIVERSE_DOMAIN`        | Firebase universe domain.                                                       |


### 2.2. Firebase Initialization

The Firebase Admin SDK is initialized using the credentials loaded from environment variables.  The `initializeApp` function is called only if no Firebase apps are already initialized, ensuring that the application doesn't attempt to initialize Firebase multiple times.  The `admin.credential.cert(serviceAccount)` method uses the structured `serviceAccount` object to authenticate with Firebase.


## 3. `sendNotification` Function

The `sendNotification` function is an asynchronous function responsible for sending FCM notifications.

### 3.1. Function Parameters

The function accepts a standard `req` (request) and `res` (response) object as input, typically provided by a serverless framework such as Cloud Functions or AWS Lambda. The request body (`req.body`) is expected to contain:

* `fcmToken`:  The Firebase Cloud Messaging registration token of the target device.
* `title`: The title of the notification.
* `body`: The main text body of the notification.


### 3.2. Input Validation

The function first validates the input. If any of the required fields (`fcmToken`, `title`, `body`) are missing, it returns a 400 Bad Request error with a descriptive JSON message.


### 3.3. Message Construction

A message object is constructed according to the FCM message format.  The message includes a `notification` object with `title` and `body` properties, and the `token` property specifying the target device's FCM token.

### 3.4. Sending the Notification

The `admin.messaging().send(message)` method asynchronously sends the notification to the specified device. The result of this operation is logged and included in the success response.

### 3.5. Error Handling

The function utilizes a `try...catch` block to handle potential errors during the notification sending process.  Any errors encountered are logged to the console and returned as a 500 Internal Server Error with a JSON error message.  This ensures that errors are appropriately reported, both for debugging and for informing the client application.
