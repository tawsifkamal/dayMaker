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

    file.mv("./uploads/" + "__target.pdf", err => {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      else {
        documentAI();
        console.log("File worked")
        return res.json({ success: true, message: 'File uploaded!'});
      }
    })
  } else {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
})

app.get('/test/:text', (req, res) => {
  const text = req.params.text;
  console.log(`Test route reached with text: ${text}`);
  res.send(`Hello from the backend! You sent: ${text}`);
});


app.listen(8080, () => {
  console.log("Running on port 8080")
})