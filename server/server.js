const express = require('express')
const app = express()
const upload = require('express-fileupload')
app.use(upload())
const documentAI = require('./documentAI');

// get driver connection
app.use(express.static('public'))

app.post("/", (req, res) => {
  console.log("route reached")
  if (req.files) {
    let file = req.files.file

    const uniqueFileName = Date.now() + '-' + file.name;
    file.mv("./uploads/" + uniqueFileName, err => {
      if (err) {
        console.log(err)
      }
      else {
        documentAI(uniqueFileName);
        console.log("File worked")
      }
    })
  }
  res.redirect("https://calendar.google.com")
})


app.listen(8080, () => {
  console.log("Running on port 8080")
})