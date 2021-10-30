const express = require('express')
const app = express()
const path = require('path')
const cors = require("cors")
// use https maybe?: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json())
// app.use(require("./routes/record"))
// get driver connection
const dbo = require("./db/conn")

app.get("/test", (req, res) => {
  console.log("Test pass")
  res.send("Test pass")
})

app.listen(5000, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  
  });
  console.log(`Server is running on port: 5000`);
})