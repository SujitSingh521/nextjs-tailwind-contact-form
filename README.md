# Advanced Contact Form App

A **Next.js 15+ Contact Form Application** with **Tailwind CSS**, **NodeMailer**, **file upload**, and **modals**.  
Users can submit messages along with optional attachments, with **spam protection**, **field validation**, and **real-time notifications**.

> 📅 **Date:** 29-09-2025  
> 👤 **Author:** Sujit Singh  
> 🔗 **GitHub Repo:** [github.com/SujitSingh521/nextjs-tailwind-contact-form](https://github.com/SujitSingh521/nextjs-tailwind-contact-form)

---

## 📝 Overview

This project is a modern, responsive contact form built with Next.js 15+ and Tailwind CSS.  
It includes server-side email handling with NodeMailer, optional file attachments, and real-time modal notifications.  
Spam protection is implemented via a hidden honeypot field, and client-side validation ensures proper input.

---

## 🚀 Features

- Fully functional contact form with:
  - Name, Email, and Message fields
  - Optional file attachment
  - Hidden honeypot field for spam protection
- Email notifications via **NodeMailer**
- Real-time **success/error modal notifications**
- Client-side validation (email format, required fields)
- Responsive design using **Tailwind CSS**
- Easy integration into any Next.js project

---

## ⚙️ Technologies Used

- **Next.js 15+**
- **React 19**
- **Tailwind CSS 4**
- **NodeMailer**
- **Formidable**
- **Winston**
- **ESLint**

### Optional Badges

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js) 
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react) 
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=for-the-badge&logo=tailwind-css) 
![NodeMailer](https://img.shields.io/badge/NodeMailer-email-green?style=for-the-badge) 
![Formidable](https://img.shields.io/badge/Formidable-upload-purple?style=for-the-badge) 
![Winston](https://img.shields.io/badge/Winston-logger-orange?style=for-the-badge) 
![ESLint](https://img.shields.io/badge/ESLint-lint-yellow?style=for-the-badge&logo=eslint)

---

## 📁 Complete Folder Structure

```text
nextjs_contact_form/
│
├─ app/
│  ├─ api/
│  │  └─ contact/
│  │     └─ POST.js          # API route to handle contact form submissions
│  ├─ page.js                # Home page rendering ContactForm component
│  └─ layout.js              # RootLayout with global styles
│
├─ components/
│  ├─ ContactForm.jsx        # Main contact form component
│  ├─ Modal.jsx              # Modal component for success/error notifications
│  └─ Notification.jsx       # Optional notification component
│
├─ utils/
│  └─ logger.js              # Custom logger utility (info, warn, error)
│
├─ public/
│  └─ screenshot.png         # Example screenshot for README
│
├─ styles/
│  └─ globals.css            # Tailwind CSS & custom global styles
│
├─ .env                      # Environment variables for SMTP configuration
├─ package.json              # Project dependencies and scripts
├─ README.md                 # Project documentation
└─ node_modules/             # Installed npm packages (auto-generated)




## 📌 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/SujitSingh521/nextjs-tailwind-contact-form.git
cd nextjs_contact_form


### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install


### 3. Configure Environment Variables

Create a `.env` file in the root of the project:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient-email@gmail.com


### 4. Run the Development Server

Start the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## 📬 Usage

1. Fill out the **Name**, **Email**, and **Message** fields.
2. Optionally, attach a file.
3. Click **Send Message**.
4. A modal notification will appear showing **success** or **error**.
5. An email will be sent to the recipient specified in `.env`.

---

## 🛡 Security & Spam Protection

- Hidden **honeypot field** to detect bots
- Required fields and **email format validation**
- Optional **file type and size validation** can be added

---

## 📄 Code Highlights

- **API Route (`app/api/contact/POST.js`)**  
  Handles form submission, validation, spam detection, and sends emails using NodeMailer.

- **ContactForm.jsx**  
  Client-side form with file upload, modal notifications, and loading spinner.

- **Modal.jsx**  
  Custom modal component for displaying success/error messages.

- **logger.js**  
  Simple logging utility for info, warning, and error messages.

---

## 📦 Deployment

- Recommended platform: **Vercel**
- Configure environment variables in the deployment platform
- Fully compatible with **Next.js 15+** and **React 19**


