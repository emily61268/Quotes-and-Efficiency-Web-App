const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


let tasks = [];
let temp = "";
let weatherDescription = "";
let icon = "";
let imageURL = "";
let place = "";


app.get("/", function(req, res) {

  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }


  let ipurl = "https://api.ipstack.com/"+ipAddr+"?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";
  // let ipurl = "https://api.ipstack.com/check?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";

  https.get(ipurl, function(response) {
    response.on("data", function(data){
      //Get user location
      let ipData = JSON.parse(data);
      place = ipData.city + "," + ipData.region_name;

      //Get current weather
      let apiID = "cd10a33402703dfcf0920bec36d23c54";
      let units = "metric";
      let url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiID + "&units=" + units;
      https.get(url, function(response) {
        //Check the url/API key is working by checking the status code.
        console.log(response.statusCode);

        //Fetch partial/all data from API and print it via console log.
        response.on("data", function(data) {

          let weatherData = JSON.parse(data);

          //After we parsed it into JSON format, we can use it to get data.
          /*Recommend: Use JSON Viewer Aweson (Chorme extension) to get the
            path of the specific data that you want to use.
          */
          temp = parseInt(weatherData.main.temp);
          weatherDescription = weatherData.weather[0].description;
          icon = weatherData.weather[0].icon;
          imageURL = "https://openweathermap.org/img/wn/" + icon + ".png";

        });
      });
    });
  });

  console.log(temp, weatherDescription);
  res.render("list", {
    newTasks: tasks,
    weather: weatherDescription,
    temperature: temp,
    imgURL: imageURL,
  });
});

//Check which button is pressed.
app.post("/", function(req, res) {
  var buttonValue = req.body.button;
  if (buttonValue === "addTask") {
    let task = req.body.taskName;
    tasks.push(task);
    res.redirect("https://quotes-and-efficiency.herokuapp.com/#loaded");
  } else if (buttonValue === "signup") {
    res.redirect("https://signup-page-11090.herokuapp.com/");
  } else {
    tasks = [];
    res.redirect("/");
  }
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Running on port 3000.");
});
