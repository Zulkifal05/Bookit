# 📘 Book It – Ticket Booking Frontend Project

**Book It** is a lightweight single-page web application (SPA) built with **HTML**, **CSS**, and **JavaScript**. It enables users to book **cinema**, **railway**, and **match** tickets. The app uses **Object-Oriented Programming (OOP)** principles in JavaScript and stores all data in the browser using **Local Storage**—no backend required!

## 🎯 Features

- 🔐 **Login Page** (`login.html`) with basic credential check (local)
- 🧾 **Single Page Application** (`index.html`) with dynamic content rendering
- 🎟️ **Ticket booking** options for:
  - Cinema
  - Railway
  - Match
- 💡 **OOP-Based JavaScript** for clean, reusable logic
- 💾 **Local Storage** for persistent booking data
- 📱 Responsive layout with modern CSS

## 🛠️ How It Works

- On visiting `login.html`, users enter credentials (can be dummy for now).
- After successful login, they are redirected to `index.html`.
- The SPA dynamically loads the booking UI based on the selected category.
- Booking data is saved in `localStorage` as JSON under appropriate keys.
- JavaScript classes manage tickets, storage, and UI rendering.
