# Internal Code Documentation: Email Verification System

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. `sendVerificationEmail` Function](#2-sendverificationemail-function)
* [3. `verifyEmail` Function](#3-verifyemail-function)
* [4. `resendOtp` Function](#4-resendotp-function)


## 1. Introduction

This document details the functionality of the email verification system, implemented using Nodemailer for email sending and bcrypt for OTP hashing.  The system allows users to verify their email addresses using a one-time password (OTP).


## 2. `sendVerificationEmail` Function

This function sends a verification email containing a generated OTP to the specified email address.

| Parameter | Type | Description |
|---|---|---|
| `email` | String | The recipient's email address. |
| `verificationCode` | String | The OTP to be included in the email. |

**Function Logic:**

1. **Nodemailer Setup:** A Nodemailer transporter is created using Gmail as the service.  Environment variables (`process.env.EMAIL_USER` and `process.env.EMAIL_PASSWORD`) store the Gmail credentials for security.
2. **Mail Options:**  The email's `from`, `to`, `subject`, and `text` are defined.  The email body contains the verification code.
3. **Email Sending:** The `transporter.sendMail` function asynchronously sends the email.
4. **Return Value:** The function returns an object indicating success or failure.  In case of failure, the error message is included.


```javascript
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
```


## 3. `verifyEmail` Function

This function verifies a user's email address using the provided OTP.

**Function Logic:**

1. **Input Validation:** Checks if both `email` and `otp` are provided in the request body. Returns a 400 error if either is missing.
2. **User Retrieval:**  Retrieves the user from the database using the provided email. Returns a 404 error if the user is not found.  It also checks if the user has a valid `emailVerificationCode`. Returns a 400 error if the `emailVerificationCode` is missing.
3. **OTP Verification:** Uses `bcrypt.compare` to compare the provided OTP with the hashed OTP stored in the database.
4. **Verification Update:** If the OTP is valid, the user's `isEmailVerified` flag is set to `true`,  `emailVerificationCode` is set to `undefined`, and the user is saved to the database. A success message is returned to the client.
5. **Error Handling:** Catches any errors during the verification process and returns a 500 error with the error message.


```javascript
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    if (!user.emailVerificationCode) {
        return res.status(400).json({ msg: "OTP has expired or is invalid." });
    }

    const isOtpValid = await bcrypt.compare(otp, user.emailVerificationCode);
    if (!isOtpValid) {
      return res.status(400).json({ user, msg: "Invalid OTP." });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully!" });
  } catch (error) {
    console.error("Error during email verification:", error);
    res
      .status(500)
      .json({ msg: `Error during email verification. ${error.message}` });
  }
};
```


## 4. `resendOtp` Function

This function resends a new OTP to the user's email address.

**Function Logic:**

1. **Input Validation:** Checks if the `email` is provided in the request body. Returns a 400 error if it's missing.
2. **User Retrieval:** Retrieves the user from the database using the provided email. Returns a 404 error if the user is not found.
3. **OTP Generation and Hashing:** Generates a new 6-digit OTP using `Math.random()`. The `userModel.hashOtp` function (not shown in the provided code snippet) is used to hash the OTP using bcrypt before storing it in the database.
4. **OTP Update:** Updates the user's `emailVerificationCode` in the database with the newly hashed OTP.
5. **Email Resending:** Calls the `sendVerificationEmail` function to resend the email with the new OTP.  Returns a 500 error if the email sending fails.
6. **Success Response:** Returns a success message to the client.
7. **Error Handling:** Catches and handles errors during the OTP resend process.


```javascript
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is required." });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedOtp = await userModel.hashOtp(otp);
    user.emailVerificationCode = hashedOtp;
    await user.save();

    const verification = await sendVerificationEmail(email, otp);
    if (!verification.success) {
      return res.status(500).json({ msg: "Error sending verification email." });
    }

    res.status(200).json({ msg: "New OTP has been sent to your email." });
  } catch (error) {
    console.error("Error during OTP resend:", error);
    res.status(500).json({ msg: `Error during OTP resend. ${error.message}` });
  }
};
```
