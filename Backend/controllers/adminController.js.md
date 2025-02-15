# Internal Code Documentation: Backend API

## Table of Contents

1. [Introduction](#introduction)
2. [Modules](#modules)
3. [Functions](#functions)
    * [addTherapist](#addtherapist)
    * [loginAdmin](#loginadmin)
    * [allTherapists](#alltherapists)
    * [allAppointments](#allappointments)
    * [cancelAppointment](#cancelappointment)
    * [adminDashboard](#admindashboard)
    * [getFeedbacks](#getfeedbacks)


## <a name="introduction"></a>1. Introduction

This document provides internal code documentation for the backend API.  It details the functionality and implementation of each exported function.


## <a name="modules"></a>2. Modules

The API utilizes the following modules:

| Module             | Description                                         |
|----------------------|-----------------------------------------------------|
| `therapistModel`    | Mongoose model for therapists.                       |
| `cloudinary`         | Cloudinary library for image uploading.              |
| `jsonwebtoken`      | Library for generating JSON Web Tokens (JWTs).       |
| `appointmentModel`  | Mongoose model for appointments.                     |
| `userModel`         | Mongoose model for users.                            |
| `Feedback`          | Mongoose model for Feedbacks.                        |


## <a name="functions"></a>3. Functions

### <a name="addtherapist"></a>3.1 `addTherapist`

This function handles the creation of new therapist profiles.

**Algorithm:**

1. **Input Validation:** Checks if all required fields (`name`, `email`, `password`, `speciality`, `experience`, `about`, `fees`, `address`) are present in the request body. Returns a 400 status code with a "Missing Details" message if any are missing.
2. **Password Hashing:** Hashes the provided password using `therapistModel.hashPasswords()`.
3. **Image Upload (Optional):** If an image is provided (`req.file`), it uploads the image to Cloudinary using the `cloudinary.uploader.upload()` method.  The secure URL of the uploaded image is stored in `imageUrl`.
4. **Therapist Data Creation:** Constructs a `therapistData` object with the received information, including the hashed password and the image URL (if available). The `address` field is parsed from a JSON string using `JSON.parse()`.
5. **Therapist Creation:** Creates a new therapist document in the database using `therapistModel.create(therapistData)`.
6. **Response:** Returns a 201 status code with a success message and the newly created therapist data.
7. **Error Handling:** Catches any errors during the process and returns a 400 status code with the error message.


### <a name="loginadmin"></a>3.2 `loginAdmin`

This function handles admin login.

**Algorithm:**

1. **Input Retrieval:** Retrieves the email and password from the request body.
2. **Authentication:** Compares the provided credentials with the environment variables `process.env.ADMIN_EMAIL` and `process.env.ADMIN_PASSWORD`.
3. **Token Generation:** If the credentials are valid, generates a JWT using `jwt.sign()`, using the concatenation of email and password as payload and `process.env.JWT_SECRET` as the secret key.
4. **Response:** Returns the generated token in the response header ("Authorization") and as JSON data in the response body (status code 200).
5. **Unauthorized Access:** If the credentials are invalid, returns a 401 status code with an "Unauthorized access" message.
6. **Error Handling:** Catches any errors and returns a 400 status code with the error message.


### <a name="alltherapists"></a>3.3 `allTherapists`

This function retrieves all therapist profiles from the database.

**Algorithm:**

1. **Database Query:** Retrieves all therapist documents from the database using `therapistModel.find()`. The `select("-password")` option excludes the password field from the results.
2. **Response:** Returns a 200 status code with an array of therapist objects.
3. **Error Handling:** Catches any database errors and returns a 500 status code with an appropriate error message.


### <a name="allappointments"></a>3.4 `allAppointments`

This function retrieves all appointments from the database.

**Algorithm:**

1. **Database Query:**  Fetches all appointments using `appointmentmodel.find({})`.
2. **Response:** Returns a 200 status code with the array of appointments.
3. **Error Handling:** Catches and handles database errors, returning a 500 status code with an error message.


### <a name="cancelappointment"></a>3.5 `cancelAppointment`

This function cancels an appointment.

**Algorithm:**

1. **Input Retrieval:** Gets the `appointmentId` from the request body.
2. **Appointment Retrieval:** Finds the appointment using `appointmentmodel.findById(appointmentId)`.  Returns a 404 error if not found.
3. **Appointment Cancellation:** Updates the appointment's `cancelled` field to `true` using `appointmentmodel.findByIdAndUpdate()`.
4. **Therapist Slot Update:** Retrieves the therapist's `slots_booked` array and removes the cancelled slot time from the appropriate date.  Updates the therapist's document using `therapistModel.findByIdAndUpdate()`.
5. **Response:** Returns a 200 status code with a success message.
6. **Error Handling:** Catches and handles any errors, returning a 400 status code with a generic error message.


### <a name="admindashboard"></a>3.6 `adminDashboard`

This function provides data for the admin dashboard.

**Algorithm:**

1. **Data Retrieval:** Retrieves the counts of therapists, users, and appointments from their respective models using `find({})` and `.length`.
2. **Latest Appointments:** Retrieves the last 5 appointments and reverses the order using `reverse().splice(0,5)`.
3. **Dashboard Data Construction:** Creates a `dashBoardData` object containing the counts and the latest appointments.
4. **Response:** Returns a 200 status code with the dashboard data.
5. **Error Handling:** Catches and handles any errors, returning a 400 status code.


### <a name="getfeedbacks"></a>3.7 `getFeedbacks`

This function retrieves all feedbacks.

**Algorithm:**

1. **Database Query:** Uses `Feedback.find()` to retrieve all feedback documents.  The `.populate("user", "name email image")` populates the user data associated with each feedback, including only the name, email, and image.  `.sort({ createdAt: -1 })` sorts the results in descending order by creation date.
2. **Response:** Sends a 200 OK response with the fetched feedback data.
3. **Error Handling:** Catches any errors and sends a 500 Internal Server Error response with the error message.

