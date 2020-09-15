const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const fetch = require("node-fetch");


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let tasks = [];
let temp = "";
let weatherDescription = "";
let icon = "";
let imageURL = "";

app.get("/", function(req, res){
  //Get date and time
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

  var cityName;
  var state;
  var counCode;

  //Get users location
  fetch('https://extreme-ip-lookup.com/json/')
  .then(res => res.json())
  .then(response => {
      cityName = response.city;
      state = response.region;
      counCode = response.countryCode;
      console.log("Country: ", response.country);
   })
   .catch((data, status) => {
      console.log('Request failed');
   })
  //var place = cityName + ", " + state + ", " + counCode;
  var place = "Alpine, Texas, US";
  console.log(place);

  //Get current weather
  let apiID = "cd10a33402703dfcf0920bec36d23c54";
  let units = "metric";
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apiID+"&units=" + units;
  https.get(url, function(response){
    //Check the url/API key is working by checking the status code.
    console.log(response.statusCode);

    //Fetch partial/all data from API and print it via console log.
    response.on("data", function(data){

      let weatherData = JSON.parse(data);

      //After we parsed it into JSON format, we can use it to get data.
      /*Recommend: Use JSON Viewer Aweson (Chorme extension) to get the
        path of the specific data that you want to use.
      */
      temp = weatherData.main.temp;
      weatherDescription = weatherData.weather[0].description;
      icon = weatherData.weather[0].icon;
      imageURL = "https://openweathermap.org/img/wn/"+ icon + ".png";

    });
  });
  console.log(temp, weatherDescription);
  res.render("list", {
    kindOfDay: day,
    newTasks: tasks,
    currentHour: time,
    weather: weatherDescription,
    userLocation: place,
    temperature: temp,
    imgURL: imageURL
  });
});



app.post("/", function(req, res){
    let task = req.body.taskName;
    tasks.push(task);
    res.redirect("/");
});





app.listen(process.env.POST || 3000, function(){
  console.log("Running on port 3000.");
});
