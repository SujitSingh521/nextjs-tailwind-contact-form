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
