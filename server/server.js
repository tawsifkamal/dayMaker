const express = require('express')
const app = express()
const upload = require('express-fileupload')
app.use(upload())
// const cors = require("cors")
const documentAI = require('./documentAI');
// const bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));

// use https maybe?: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// app.use(cors());
// app.use(express.json())
// app.use(require("./routes/record"))
// get driver connection
app.use(express.static('public'))

// app.get("/", (req, res) => {
//   console.log("index reached")
//   res.sendFile("/public/index.html")
// })

app.post("/", (req, res) => {
  console.log("route reached")
  // console.log(req.files)
  if (req.files) {
    // console.log("file uploaded")
    let file = req.files.file
    // let filename = file.name
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


app.listen(8080, () => {
  console.log("Live on port 8080")
})