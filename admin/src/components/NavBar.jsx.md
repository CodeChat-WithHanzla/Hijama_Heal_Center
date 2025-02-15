# NavBar Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. `logout` Function Detail](#3-logout-function-detail)


## 1. Overview

The `NavBar` component renders a navigation bar at the top of the application.  It displays a logo, a user role indicator (Admin or Therapist), and a logout button. The component utilizes React Context (`AdminContext`, `TherapistContext`) to manage authentication tokens and React Router's `useNavigate` hook for redirection.


## 2. Component Structure

The `NavBar` component is a functional React component. Its structure is as follows:

| Element          | Description                                                              |
|-----------------|--------------------------------------------------------------------------|
| `div` (container)| Main container for the navigation bar.  Uses Tailwind CSS for styling.     |
| `div` (left side) | Contains the logo and user role indicator.                             |
| `img`            | Displays the application logo.  Source is determined by the `assets` object.|
| `p`              | Displays "Admin" if `aToken` is present, otherwise "Therapist".          |
| `button`         | The logout button. Triggers the `logout` function on click.             |


The component uses the following imports:

*   `React`, `useContext`: For React functional component and context API usage.
*   `assets`: An object containing asset paths, likely images (e.g., logo).
*   `AdminContext`:  Provides the admin authentication token (`aToken`) and its setter function (`setAToken`).
*   `TherapistContext`: Provides the therapist authentication token (`therapistToken`) and its setter function (`setTherapistToken`).
*   `useNavigate`:  For programmatically navigating within the application.

## 3. `logout` Function Detail

The `logout` function handles the user logout process.  It performs the following actions:

1.  **Navigation:** Redirects the user to the root path (`/`) using `navigate('/')`.
2.  **Admin Token Removal:** If `aToken` exists (indicating an admin user), it removes the token from `localStorage` and sets `aToken` in the context to an empty string.
3.  **Therapist Token Removal:** If `therapistToken` exists (indicating a therapist user), it removes the token from `localStorage` and sets `therapistToken` in the context to an empty string.

The algorithm is straightforward:  it checks for the presence of each token and performs the removal actions accordingly.  This ensures that both admin and therapist users are properly logged out.  The removal from `localStorage` prevents the user from automatically being logged in on subsequent visits.  Setting the token to an empty string in the context updates the application state and reflects the logged-out status.  There is no error handling explicitly included in this function; it assumes successful `localStorage` operations.
