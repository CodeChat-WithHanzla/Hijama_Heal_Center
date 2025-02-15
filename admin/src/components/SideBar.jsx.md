# Internal Code Documentation: SideBar Component

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3. Conditional Rendering Logic](#3-conditional-rendering-logic)
* [4. Navigation Link Styling](#4-navigation-link-styling)


## 1. Overview

The `SideBar` component renders a navigation menu for both administrators and therapists.  The menu items displayed are conditionally determined by the presence of authentication tokens stored in React contexts.  This component leverages React Router's `NavLink` for navigation and implements dynamic styling based on the active route.


## 2. Component Structure

The `SideBar` component is a functional React component that utilizes the `AdminContext` and `TherapistContext` to access authentication tokens.  It's structured as follows:

| Element          | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `div` (container)| Main container for the sidebar, styled with `min-h-screen bg-white border-r`. |
| Conditional `ul` | Unordered lists containing navigation links; conditionally rendered based on user role (admin or therapist). |
| `NavLink`        |  React Router component for each navigation item.  Each item includes an icon and text label.                                           |


The component imports necessary modules:

* `React`, `useContext`:  For React functionality and context API access.
* `AdminContext`, `TherapistContext`: Custom contexts for storing admin and therapist authentication tokens.
* `NavLink`: From `react-router` for client-side routing.
* `assets`: An object containing paths to icons.


## 3. Conditional Rendering Logic

The component uses conditional rendering to display different navigation menus based on the user's role:

* **Admin:** If `aToken` (from `AdminContext`) exists, an unordered list (`<ul>`) containing admin-specific navigation links is rendered.
* **Therapist:** If `therapistToken` (from `TherapistContext`) exists, a separate unordered list (`<ul>`)  containing therapist-specific navigation links is rendered.


The conditional rendering logic is implemented using JavaScript's short-circuit evaluation within the JSX:

```javascript
{aToken && <ul>...</ul>}
{therapistToken && <ul>...</ul>}
```

This ensures that only the appropriate navigation menu is rendered for the logged-in user.  If neither token is present, no navigation menu will be displayed.


## 4. Navigation Link Styling

Each `NavLink` uses a template literal to dynamically apply styling based on its active state. The `className` prop of each `NavLink` is a function that receives an object containing an `isActive` property.  The styling logic is as follows:

```javascript
className={({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
}
```

* **Base Styles:**  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer` applies consistent base styles to all links (flexbox layout, padding, cursor style, etc.).  Media queries (`md:`) are used for responsive design.
* **Active Styles:** If `isActive` is true (the link is active), `bg-[#F2F3FF] border-r-4 border-primary` adds a background color and border to highlight the selected item.  The `border-primary` class presumably defines the primary color used in the application.


This approach ensures that the active navigation link is clearly visually distinguished from inactive links, providing a better user experience.
