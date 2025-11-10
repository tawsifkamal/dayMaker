# dayMaker

dayMaker is a web application that helps you automatically create Google Calendar events from a PDF file. Simply upload your PDF, and dayMaker will intelligently extract events and add them to your calendar.

## How it Works

dayMaker consists of a React frontend and a Node.js backend.

*   **Frontend**: The React application provides a simple user interface for uploading a PDF file.
*   **Backend**: The Node.js backend uses the Google Document AI API to process the uploaded PDF, extract relevant information, and create events in your Google Calendar.

## Getting Started

To get started with dayMaker, you'll need to set up both the frontend and backend services.

### Frontend

1.  Navigate to the `app` directory: `cd app`
2.  Install the dependencies: `npm install`
3.  Run the application: `npm start`

### Backend

1.  Navigate to the `server` directory: `cd server`
2.  Install the dependencies: `npm install`
3.  Set up your Google Cloud credentials.
4.  Run the server: `node server.js`
