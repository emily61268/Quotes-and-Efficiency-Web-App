const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("http");


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let tasks = [];

app.get("/", function(req, res){
  let today = new Date();

  let options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  let options2 = {hour12: false};

  let day = today.toLocaleDateString("en-US", options);
  let time = today.toLocaleTimeString("en-GB", options2);
  time = time.substring(0,2);
  res.render("list", {kindOfDay: day, newTasks: tasks, currentHour: time});
});



app.post("/", function(req, res){
    let task = req.body.taskName;
    tasks.push(task);
    res.redirect("/");
});





app.listen(process.env.POST || 3000, function(){
  console.log("Running on port 3000.");
});
