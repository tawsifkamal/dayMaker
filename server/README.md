# dayMaker Backend

This is the backend for the dayMaker application, a Node.js server that processes uploaded PDFs and creates Google Calendar events.

## Overview

The backend is an Express server that exposes an API endpoint for file uploads. When a PDF is uploaded, the server uses the Google Document AI API to extract text and entities from the document. It then uses the Google Calendar API to create events based on the extracted information.

## Getting Started

To run the backend server, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Up Google Cloud Credentials**:
    *   Enable the Document AI API and the Google Calendar API in the Google Cloud Console.
    *   Create a service account and download the credentials as a JSON file.
    *   Save the credentials file as `credentials.json` in the `server` directory.

3.  **Run the Server**:
    ```bash
    node server.js
    ```

    The server will run on port 8080.

## API Endpoints

*   `POST /`: The file upload endpoint. The request should be a multipart/form-data request with a single file field named `file`.

## Key Files

*   `server.js`: The main Express server file.
*   `documentAI.js`: The module that interacts with the Google Document AI API.
*   `calendar.js`: The module that interacts with the Google Calendar API.
*   `entityExtractor.js`: A helper module for entity extraction.
