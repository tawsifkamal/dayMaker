# dayMaker

dayMaker is a web application that helps you manage your schedule by automatically creating Google Calendar events from uploaded PDF files.

## Project Structure

The project is divided into two main parts:

- `app/`: The frontend of the application, built with React.
- `server/`: The backend of the application, built with Node.js and Express.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Backend Setup

1.  Navigate to the `server` directory:
    ```sh
    cd server
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Start the server:
    ```sh
    npm start
    ```
    The server will be running on `http://localhost:5000`.

### Frontend Setup

1.  In a new terminal, navigate to the `app` directory:
    ```sh
    cd app
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Start the React application:
    ```sh
    NODE_OPTIONS=--openssl-legacy-provider npm start
    ```
    The application will be running on `http://localhost:3000`.

## Available Scripts

### Frontend (`app/`)

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

### Backend (`server/`)

- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode using nodemon.
