/**
 * @fileoverview Express server for the DayMaker application.
 * Handles file uploads and triggers the Document AI processing pipeline.
 */

const express = require('express')
const app = express()
const upload = require('express-fileupload')
app.use(upload())
const documentAI = require('./documentAI');

// Serve static files from the 'public' directory
app.use(express.static('public'))

/**
 * Handles the file upload POST request.
 * Receives a file, saves it locally, triggers the Document AI processing,
 * and redirects the user to Google Calendar.
 *
 * @name POST /
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.files - The object containing uploaded files.
 * @param {Object} req.files.file - The specific file uploaded with the key 'file'.
 * @param {Object} res - The response object.
 */
app.post("/", (req, res) => {
  console.log("route reached")
  if (req.files) {
    let file = req.files.file

    file.mv("./uploads/" + "__target.pdf", err => {
      if (err) {
        console.log(err)
      }
      else {
        documentAI();
        console.log("File worked")
      }
    })
  }
  res.redirect("https://calendar.google.com")
})


/**
 * Starts the server on port 8080.
 */
app.listen(8080, () => {
  console.log("Running on port 8080")
})