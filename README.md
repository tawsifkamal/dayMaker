# dayMaker

This project is a web application designed to help organize and plan your day by creating Google Calendar events from PDF files.

## Architecture

The project follows a client-server architecture:

- **Frontend:** A React application located in the `app/` directory.
- **Backend:** A Node.js/Express server located in the `server/` directory.

## Frontend

The frontend is a [Create React App](https://github.com/facebook/create-react-app) application with the following modifications:

- **[Craco](https://craco.js.org/):** Used for configuration overriding.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework.

### Getting Started (Frontend)

1. Navigate to the `app/` directory: `cd app`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

The application will be available at [http://localhost:3000](http://localhost:3000).

## Backend

The backend is a Node.js server using the [Express](https://expressjs.com/) framework. Its primary responsibility is to handle PDF file uploads, process them using Google Document AI, and interact with the Google Calendar API.

### Getting Started (Backend)

1. Navigate to the `server/` directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

The server will run on port 8080.
