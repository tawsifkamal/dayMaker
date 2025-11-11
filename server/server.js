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

    const fileName = `${Date.now()}-${req.files.file.name}`;
    const filePath = `./uploads/${fileName}`;
    file.mv(filePath, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      documentAI(filePath);
      console.log("File worked");
    })
  }
  res.redirect("https://calendar.google.com")
})


app.listen(8080, () => {
  console.log("Running on port 8080")
})