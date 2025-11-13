const express = require('express')
const app = express()
const upload = require('express-fileupload')
app.use(upload())
const documentAI = require('./documentAI');
const fs = require('fs').promises;

// get driver connection
app.use(express.static('public'))

app.post("/", (req, res) => {
  console.log("route reached")
  if (req.files) {
    let file = req.files.file
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = `./uploads/${uniqueFileName}`;

    file.mv(filePath, err => {
      if (err) {
        console.log(err)
      }
      else {
        documentAI(filePath)
          .catch(err => console.error("Error processing file:", err))
          .finally(() => {
            fs.unlink(filePath)
              .catch(err => console.error("Error deleting file:", err));
          });
        console.log("File worked")
      }
    })
  }
  res.redirect("https://calendar.google.com")
})


app.listen(8080, () => {
  console.log("Running on port 8080")
})