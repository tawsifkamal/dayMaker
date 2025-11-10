// Import necessary modules
const express = require('express');
const app = express();
const upload = require('express-fileupload');
const documentAI = require('./documentAI');

// Enable file uploads
app.use(upload());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define the file upload route
app.post('/', (req, res) => {
  console.log('Route reached');
  // Check if a file was uploaded
  if (req.files) {
    let file = req.files.file;

    // Move the uploaded file to the 'uploads' directory
    file.mv('./uploads/' + '__target.pdf', (err) => {
      if (err) {
        console.log(err);
      } else {
        // Process the file with Document AI
        documentAI();
        console.log('File worked');
      }
    });
  }
  // Redirect the user to Google Calendar
  res.redirect('https://calendar.google.com');
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Running on port 8080');
});
