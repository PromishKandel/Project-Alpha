# Project Alpha

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Prerequisites](#prerequisites)

## Introduction
Project Alpha is a cutting-edge drone and camera surveillance system. Utilizing advanced facial recognition technology, the drones can identify and track targets listed in the target database. The frontend is built with React.js and Tailwind CSS, while the backend leverages Express.js and MongoDB. The platform is flexible, allowing users to customize the camera feed selection based on Wi-Fi signal strength, local connection, and other criteria.

## Features
- Upload Target
- Facial Recognition
- Capture Photos of Target
- Target Database Management

## Installation
Follow these steps to set up Project Alpha:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/project-alpha.git
    ```
2. Open two terminal windows.
3. Navigate to the backend directory in the first terminal:
    ```bash
    cd project-alpha/backend
    ```
4. Navigate to the frontend directory in the second terminal:
    ```bash
    cd project-alpha/frontend
    ```
5. Install dependencies in both directories:
    ```bash
    npm install
    ```
6. Start the backend server:
    ```bash
    node server.js
    ```
7. Start the frontend development server:
    ```bash
    npm run dev
    ```

### Prerequisites
- A valid MongoDB database setup (MongoDB Atlas recommended).
- Create a `.env` file in the backend directory with the following content:
    ```env
    PORT = 5001
    MONGODB_URI=your-mongodb-uri
    ```
- Ensure a webcam is connected or you are connected to a drone using a UDP socket.

