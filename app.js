const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));












app.listen(process.env.POST || 3000, function(){
  console.log("Running on port 3000.");
});
