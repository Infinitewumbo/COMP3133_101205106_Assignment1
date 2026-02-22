# COMP3133 - Assignment 1: GraphQL Employee API

**Author:** Patrick Millares (101205106)
**Course:** COMP3133 - Full Stack Development

## 📌 Project Overview
This project is a GraphQL API built with Node.js, Express, and Apollo Server. It manages a company's employee database and includes user authentication. It also features cloud-based image storage for employee profile pictures using Cloudinary.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js (v5 Integration)
* **GraphQL Server:** Apollo Server 4 (`@apollo/server`)
* **Database:** MongoDB Atlas & Mongoose
* **Image Hosting:** Cloudinary
* **Authentication/Security:** bcryptjs

## ⚙️ Environment Variables Setup
To run this project locally, you must create a `.env` file in the root directory and provide the following variables:

```text
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret