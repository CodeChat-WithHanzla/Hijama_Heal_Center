# Internal Code Documentation: Backend Application

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. Setup and Configuration](#2-setup-and-configuration)
* [3. Middleware](#3-middleware)
    * [3.1 CORS Configuration](#31-cors-configuration)
* [4. Routing](#4-routing)
* [5.  Error Handling](#5-error-handling)


## 1. Introduction

This document provides internal documentation for the backend application.  The application uses Express.js framework to handle requests and manage routes for user, admin, and therapist functionalities.


## 2. Setup and Configuration

The application starts by loading environment variables using the `dotenv` package. This allows for flexible configuration without hardcoding sensitive information directly into the code.  Environment variables are expected to include:

| Variable Name             | Description                                     |
|--------------------------|-------------------------------------------------|
| `FRONTEND_URL`           | URL of the primary frontend application.        |
| `FRONTEND_URL2`          | URL of a secondary frontend application.       |
| `HOSTED_URL_FRONTEND`    | URL of the frontend application in a hosting environment. |


The Express.js application is initialized, and several middleware functions are applied to handle different request aspects.


## 3. Middleware

### 3.1 CORS Configuration

The application utilizes the `cors` middleware to handle Cross-Origin Resource Sharing (CORS) requests.  The `allowedOrigins` array defines which origins are permitted to access the API.  The `origin` callback function checks if the request origin is included in `allowedOrigins`.

The algorithm implemented in the `cors` middleware is as follows:

1. **Origin Check:**  It receives the `origin` from the request header. If the origin is null (no origin header) or is present in the `allowedOrigins` array, it proceeds.
2. **Callback:** If the origin is allowed, the callback function is called with `null` (no error) and `true` (allowing the request).
3. **Error Handling:** If the origin is not allowed, the callback function is called with an `Error("Not allowed by CORS")` object, rejecting the request.

This setup ensures that only authorized frontend applications can interact with the backend API, enhancing security.  The `credentials: true` option enables the use of cookies with CORS requests.  This is crucial for maintaining session state across multiple domains.


## 4. Routing

The application defines routes for different functionalities using Express.js routers.

| Route Prefix | Router          | Middleware             | Description                                  |
|--------------|-----------------|-------------------------|----------------------------------------------|
| `/user`      | `userRouter`    | None                    | Handles user-related requests.             |
| `/admin`     | `adminRouter`   | `upload.single("image")` | Handles admin requests, including file uploads (single image). |
| `/therapists`| `therapistRouter`| None                    | Handles therapist-related requests.          |

The `upload.single("image")` middleware, imported from `./middlewares/multer.js` (not shown in the provided code snippet), is responsible for handling single file uploads for admin routes.  This likely uses a library like Multer to process the uploaded file.


## 5. Error Handling

While not explicitly shown in this code snippet, robust error handling should be implemented within each router to gracefully manage unexpected situations (e.g., database errors, invalid input).  This might involve custom middleware or try-catch blocks within route handlers to catch and process errors, returning appropriate HTTP status codes and error messages to the client.
