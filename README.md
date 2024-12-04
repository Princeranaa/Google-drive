# Google Drive Clone Project

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Endpoints](#endpoints)

## Project Overview

This project is a basic clone of Google Drive implemented using Node.js, Express.js, and MongoDB. It provides a simple file storage and sharing system with user authentication.

## Features

- User registration and login
- File upload functionality
- Cloud-based storage using Cloudinary

## Technologies Used

- Node.js
- Express.js (web framework)
- MongoDB (database)
- Cloudinary (cloud storage service)
- EJS (templating engine)

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (e.g., `PORT`, `MONGODB_URI`)
4. Run the application: `node app.js`

## Endpoints

### User Routes
- GET `/` - Home page
- POST `/user/register` - Register new user
- POST `/user/login` - Login existing user
- GET `/user/profile` - Get current user profile (requires authentication)


## File Upload Process

File uploads are handled through the following endpoints and components:

1. **Upload Button**: Located on the home page (`/`) in the `home.ejs` template.

2. **Upload Endpoint**: 
   - POST `/upload`


## How It Works

1. Users can register for an account by visiting `/user/register`.
2. Existing users can log in at `/user/login`.
3. Once logged in, users can access the home page (`/`) where they'll find an "Upload" button.
4. Clicking the "Upload" button will trigger the file upload process.
5. Files are stored on Cloudinary, which is integrated into the application.
6. Users can view their uploaded files on their profile page (authenticated users only).
7. The application uses JWT for secure user authentication.

Note: This is a basic implementation and lacks some features of the full Google Drive service, such as folder organization, shared links.
