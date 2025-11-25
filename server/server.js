const express = require('express')
const app = express()
const upload = require('express-fileupload')
app.use(upload())
const documentAI = require('./documentAI');

// get driver connection
app.use(express.static('public'))

app.post("/", async (req, res) => {
  console.log("route reached")
  if (req.files) {
    let file = req.files.file
    try {
      await file.mv("./uploads/" + "__target.pdf")
      await documentAI()
      console.log("File worked")
    } catch (err) {
      console.log(err)
    }
  }
  res.redirect("https://calendar.google.com")
})


app.listen(8080, () => {
  console.log("Running on port 8080")
})