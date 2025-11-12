const express = require('express')
const app = express()
const upload = require('express-fileupload')
const { v4: uuidv4 } = require('uuid');
app.use(upload())
const documentAI = require('./documentAI');

// get driver connection
app.use(express.static('public'))

app.post("/", (req, res) => {
  console.log("route reached")
  if (req.files) {
    let file = req.files.file
    const fileName = `${uuidv4()}.pdf`;

    file.mv("./uploads/" + fileName, async err => {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      try {
        await documentAI(fileName);
        res.json({ success: true, message: 'File uploaded and processed successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing document.' });
      }
    })
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
})


app.listen(8080, () => {
  console.log("Running on port 8080")
})