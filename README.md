# DayMaker

DayMaker is a full-stack application designed to streamline your schedule management. It takes PDF documents (like course syllabi or schedules), extracts event dates and titles using Google Cloud Document AI and Natural Language API, and automatically creates events in your Google Calendar.

## Features

- **PDF Upload**: Upload your PDF documents directly through the web interface.
- **Intelligent Parsing**: Uses Google Cloud Document AI to extract text from PDFs.
- **Entity Extraction**: Uses Google Cloud Natural Language API to identify dates and event titles.
- **Calendar Integration**: Automatically syncs detected events to your Google Calendar.

## Project Structure

- `app/`: Contains the React frontend application.
- `server/`: Contains the Node.js/Express backend server.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A Google Cloud Platform project with Document AI and Natural Language API enabled.
- Appropriate Google Cloud credentials configured (see `server` directory).

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dayMaker
   ```

2. **Install Backend Dependencies:**
   Navigate to the `server` directory and install the required packages.
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   Navigate to the `app` directory and install the required packages.
   ```bash
   cd ../app
   npm install
   ```

## Running the Application

### Backend Server

1. Navigate to the `server` directory.
2. Start the server:
   ```bash
   npm start
   ```
   The server will start running on port 8080.

### Frontend Application

1. Navigate to the `app` directory.
2. Start the React development server:
   ```bash
   npm start
   ```
   This will launch the application in your default browser (typically at http://localhost:3000).

## Technologies Used

- **Frontend**: React, Create React App
- **Backend**: Node.js, Express
- **Cloud Services**: Google Cloud Document AI, Google Cloud Natural Language API, Google Calendar API
