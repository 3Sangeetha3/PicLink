# PicLink

PicLink is an image hosting service that allows users to upload images and receive a CDN link to share them instantly. It leverages GitHub as the storage backend and jsDelivr as the CDN for fast and reliable image delivery.

## Table of Contents
- [PicLink](#piclink)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Usage](#usage)
    - [Environment Variables](#environment-variables)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
  - [Deployment](#deployment)
    - [Backend Deployment](#backend-deployment)
    - [Frontend Deployment](#frontend-deployment)
    - [CORS Configuration](#cors-configuration)
    - [GitHub Repository](#github-repository)
  - [Contributing](#contributing)
  - [👤 Author](#-author)
  - [⭐ Show your support](#-show-your-support)

## Features
- **Image Upload with Preview:** Upload images with a live preview before submission.
- **Drag and Drop Support:** Easily upload images by dragging them into the upload area.
- **Upload Progress Indicator:** Visual feedback during the upload process.
- **CDN URL Generation:** Automatically generates a CDN link for the uploaded image.
- **Copy to Clipboard:** Quickly copy the generated CDN URL with a single click.
- **Confetti Celebration:** A fun confetti animation celebrates successful uploads.

## Technologies Used
### Backend
- **Node.js:** JavaScript runtime for server-side logic.
- **Express.js:** Web framework for handling HTTP requests.
- **Multer:** Middleware for handling multipart/form-data, used for file uploads.
- **Octokit:** GitHub API client for interacting with GitHub repositories.
- **CORS:** Middleware for enabling cross-origin resource sharing.

### Frontend
- **React:** JavaScript library for building user interfaces.
- **Vite:** Fast development server and build tool.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **AOS:** Library for scroll animations.
- **Lucide React:** Icon library for React.
- **Canvas Confetti:** Library for confetti animations.
- **Typed.js:** Library for typing animations.
- **Axios:** Promise-based HTTP client for making API requests.

## Setup
### Prerequisites
- **Node.js and npm:** Ensure you have Node.js and npm installed on your machine.
- **GitHub Account:** You need a GitHub account and a public repository to store the uploaded images.

### Backend Setup

1. Navigate to the PicLink-Backend directory:
   ```bash
   cd PicLink-Backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the PicLink-Backend directory with:
   ```bash
    PORT=3001
    FRONTEND_URL=http://localhost:5173
    GITHUB_TOKEN=your_github_personal_access_token
    GITHUB_USERNAME=your_github_username
    GITHUB_REPO=your_github_repository_name
    GITHUB_BRANCH=main
    GITHUB_FOLDER=images
   ```
   Replace placeholder values with your actual GitHub details.
4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the PicLink-Frontend directory:
   ```bash
   cd PicLink-Frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the PicLink-Backend directory with:
   ```bash
    VITE_BACKEND_URL=http://localhost:3001
   ```
   Replace placeholder values with your actual GitHub details.
4. Start the development server:
   ```bash
   npm run dev
   ```

### Usage
1.  Open your browser and navigate to http://localhost:5173 (or the port shown after running npm run dev).

2.  Select an image file or drag and drop it into the upload area.

3.  Click the "Upload Image" button to start the upload process.

4.  After a successful upload, the CDN URL will be displayed along with a preview of the image.

5.  Use the "Copy" button to copy the CDN URL to your clipboard for easy sharing.

### Environment Variables
## Backend

- PORT: The port on which the backend server runs (default: 3001).

-   FRONTEND_URL: The URL of the frontend application for CORS configuration (e.g., http://localhost:5173).

-    GITHUB_TOKEN: Your GitHub personal access token with repo scope.

-   GITHUB_USERNAME: Your GitHub username.

-    GITHUB_REPO: The name of the GitHub repository where images will be stored.

-    GITHUB_BRANCH: The branch to use in the repository (default: main).

-   GITHUB_FOLDER: The folder within the repository to store images (default: images).
## Frontend

-    VITE_BACKEND_URL: The URL of the backend server (e.g., http://localhost:3001).

## Deployment
To deploy PicLink to a production environment:

### Backend Deployment
1. Deploy the backend to a server (e.g., Heroku, Vercel, DigitalOcean)
2. Set the environment variables in your hosting platform's dashboard
3. Ensure the server is running and accessible via a public URL

### Frontend Deployment
1. Deploy the frontend to a hosting service (e.g., Netlify, Vercel, GitHub Pages)
2. Update the `VITE_BACKEND_URL` in the frontend's environment variables to point to the deployed backend URL

### CORS Configuration
- Update the `FRONTEND_URL` in the backend's environment variables to the deployed frontend URL

### GitHub Repository
- Ensure the GitHub repository is public, as jsDelivr requires public access to serve the images

## Contributing
If you encounter any issues or have suggestions for improvements, feel free to:
1. Open an issue on the project's repository
2. Submit a pull request with your proposed changes

## 👤 Author
**Jadamal Sangeetha Choudhary**

## ⭐ Show your support
Give a ⭐️ if this project helped you!

