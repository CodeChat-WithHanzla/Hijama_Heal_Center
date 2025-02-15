# AdminContextProvider Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Data Management](#2-data-management)
* [3. API Interactions](#3-api-interactions)
    * [3.1 `getAllTherapists`](#31-getalltherapists)
    * [3.2 `changeAvailability`](#32-changeavailability)
    * [3.3 `getAllAppointments`](#33-getallappointments)
    * [3.4 `cancelAppointment`](#34-cancelappointment)
    * [3.5 `getDashboardData`](#35-getdashboarddata)
    * [3.6 `getAllFeedback`](#36-getallfeedback)
* [4. Context Provider](#4-context-provider)


## 1. Overview

The `AdminContextProvider` component provides context for administrative functionalities within the application. It manages application state related to therapists, appointments, dashboard data, and feedback, and facilitates communication with the backend API.  The component uses `useState` hooks to manage the application's state and `axios` for making API calls.  Error handling is implemented using `react-toastify` for user feedback.  The backend URL is configured via environment variables (`import.meta.env.VITE_BACKEND_URL`).

## 2. Data Management

The component utilizes the following state variables:

| State Variable      | Type             | Description                                          |
|----------------------|-----------------|------------------------------------------------------|
| `aToken`            | String           | Authentication token stored in local storage.        |
| `therapists`        | Array            | Array of therapist data objects.                     |
| `appointments`      | Array            | Array of appointment data objects.                   |
| `dashboardData`     | Array            | Array of dashboard data objects.                     |
| `feedback`          | Array            | Array of feedback data objects.                       |


## 3. API Interactions

The component interacts with a backend API using `axios` to perform various administrative tasks.  All API calls include the authentication token (`aToken`) in the headers. Error handling consistently displays messages to the user via `react-toastify`.

### 3.1 `getAllTherapists`

This function retrieves a list of all therapists from the backend API.

* **API Endpoint:** `${BackendUrl}/admin/all-therapist`
* **Method:** `GET`
* **Algorithm:**
    1. Makes a GET request to the specified endpoint with the authentication token in the header.
    2. Upon receiving a successful response (status code 200), it updates the `therapists` state with the therapist data from the response (`data.therapists`).
    3. Error handling is implemented to catch and display appropriate error messages using `react-toastify` based on the type of error encountered.


### 3.2 `changeAvailability`

This function updates the availability status of a therapist.

* **API Endpoint:** `${BackendUrl}/admin/changeAvailability`
* **Method:** `PUT`
* **Algorithm:**
    1. Makes a PUT request to the specified endpoint with the therapist's ID (`_id`) and the authentication token.
    2. Upon receiving a successful response (status code 200), it displays a success message using `react-toastify` and refreshes the therapist list by calling `getAllTherapists`.
    3. Error handling displays an error message using `react-toastify`.


### 3.3 `getAllAppointments`

This function retrieves a list of all appointments from the backend API.

* **API Endpoint:** `${BackendUrl}/admin/all-appointments`
* **Method:** `GET`
* **Algorithm:**
    1. Makes a GET request to the specified endpoint with the authentication token in the header.
    2. Upon receiving a successful response (status code 200), it updates the `appointments` state with the appointment data from the response (`data.appointments`).
    3. Error handling displays a generic "Failed to fetch appointments" message.


### 3.4 `cancelAppointment`

This function cancels a specific appointment.

* **API Endpoint:** `${BackendUrl}/admin/cancel-appointments`
* **Method:** `PUT`
* **Algorithm:**
    1. Makes a PUT request to the specified endpoint with the appointment ID (`appointmentId`) and the authentication token.
    2. Upon receiving a successful response (status code 200), it displays a success message (`data.msg`) using `react-toastify` and refreshes the appointments list by calling `getAllAppointments`.
    3. Error handling displays an error message (`data.msg` or a generic error message).


### 3.5 `getDashboardData`

This function retrieves dashboard data from the backend API.

* **API Endpoint:** `${BackendUrl}/admin/dashboard`
* **Method:** `GET`
* **Algorithm:**
    1. Makes a GET request to the specified endpoint with the authentication token in the header.
    2. Upon receiving a successful response (status code 200), it updates the `dashboardData` state with the dashboard data from the response (`data.dashBoardData`).
    3. Error handling displays a generic "Failed to fetch dashboard data" message.


### 3.6 `getAllFeedback`

This function retrieves all feedback from the backend API.

* **API Endpoint:** `${BackendUrl}/admin/feedback`
* **Method:** `GET`
* **Algorithm:**
    1. Makes a GET request to the specified endpoint with the authentication token in the header.
    2. Upon receiving a successful response (status code 200), it updates the `feedback` state with the feedback data from the response (`data`).
    3. Error handling displays a generic "Failed to get feedback. Please try again later." message.


## 4. Context Provider

The `AdminContextProvider` uses React's `createContext` to create a context object.  The `value` prop of the provider includes all state variables and functions, making them accessible to all components wrapped within the provider.  This allows for easy access and management of application state and API interaction throughout the application.
