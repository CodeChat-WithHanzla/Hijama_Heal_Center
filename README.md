# Hijama Heal Center - Comprehensive Documentation

## Table of Contents
- [Hijama Heal Center - Comprehensive Documentation](#hijama-heal-center---comprehensive-documentation)
  - [Table of Contents](#table-of-contents)
  - [System Overview](#system-overview)
  - [Modules](#modules)
    - [Admin Panel](#admin-panel)
    - [Therapists Panel](#therapists-panel)
    - [Frontend Application](#frontend-application)
    - [Backend Server](#backend-server)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Appointments Management](#appointments-management)
    - [Therapists Management](#therapists-management)
    - [Admin](#admin)
    - [User Management](#user-management)
    - [Notifications](#notifications)
  - [Setup Instructions](#setup-instructions)

## System Overview
The Hijama Heal Center is a full-stack web application designed to manage appointments, therapists, and patient interactions for a hijama therapy center. The system consists of three main components:

1. **Admin Panel**: A comprehensive management interface for administrators and therapists to efficiently oversee client interactions, appointments, and service records.
2. **Frontend Application**: Patient-facing interface for booking and managing appointments
3. **Backend Server**: REST API and database management

## Modules

### Admin Panel
The admin panel provides comprehensive management capabilities including:
- Therapist management
- Appointment tracking
- Feedback review
- Dashboard analytics

Key Features:
- Add/remove therapists
- View all appointments
- Manage patient feedback
- Monitor system performance

### Therapists Panel
The admin panel provides comprehensive management capabilities including:
- Appointment tracking
- Profile review
- Dashboard analytics

Key Features:
- View all appointments
- Complete/Cancell appointments


### Frontend Application
The patient-facing interface allows users to:
- Browse available therapists
- Book appointments
- Manage their profile
- View appointment history

Key Features:
- Therapist search and filtering
- Appointment scheduling
- Profile management
- Payment integration

### Backend Server
The backend provides RESTful API endpoints for:
- User authentication
- Appointment management
- Therapist operations
- Notification services

Key Technologies:
- Node.js with Express framework
- MongoDB database
- Cloudinary for media storage
- JWT for authentication

## API Documentation

### Authentication
- `POST /user/login` - User login
- `POST /user/register` - User registration
- `POST /user/resendOtp` - Resend OTP
- `POST /user/verifyEmail` - Verify user email
- `POST /admin/login` - Admin login
- `POST /therapists/login` - Therapist login

### Appointments Management
- `POST /user/book-appointment` - Create new appointment
- `POST /user/get-appointments` - Get user appointments
- `POST /user/cancel-appointment` - Cancel appointment

### Therapists Management
- `GET /therapists/appointments` - Get all Appointments
- `PUT /therapists/complete-appointment` - Complete the Appointment 
- `PUT /therapists/cancel-appointment` - Cancel the Appointment 
- `GET /therapists/dashboard` - Get all Dashboard
- `GET /therapists/profile` - Get all Profile
- `PUT /therapists/update-profile` - Update all Profile

### Admin
- `POST /admin/addTherapist` - Add new therapist
- `GET /admin/dashboard` - Get dashboard statistics
- `GET /admin/all-appointments` - Get all appointments
- `GET /admin/feedback` - Get all feedback
- `PUT /admin/changeAvailability` - changes availability
- `PUT /admin/cancel-appointments` - cancel appointment

### User Management
- `GET /user/get-profile` - Get user profile
- `PUT /user/update-user` - Update user profile
- `POST /user/book-appointment` - Book Appointment
- `POST /user/cancel-appointment` - Cancel Appointment
- `POST /user/feedback` - Submit Feedback

<!-- ### Payment
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/history` - Get payment history -->

### Notifications
- `POST /user/send-notification` - Send notification

## Setup Instructions
1. Install dependencies:
   ```bash
   cd admin && npm install
   cd ../frontend && npm install
   cd ../Backend && npm install
   ```
2. Configure environment variables
3. Start development servers:
   ```bash
   # Backend
   cd Backend && npx nodemon
   
   # Frontend
   cd frontend && npm run dev
   
   # Admin
   cd admin && npm run dev
   ```
