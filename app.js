const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const _ = require('lodash');
const mongoose = require("mongoose");




const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use MongoDB to store lists
//UC
mongoose.connect("mongodbURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//For local test
// mongoose.connect("mongodbURL", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });


//Setup item schema
const itemSchema = {
  name: String,
  email: String
};


const Item = mongoose.model("Item", itemSchema);

const welcome1 = new Item({
  name: "Welcome to your to-do list!",
});


const welcome2 = new Item({
  name: "Hit Enter or the + button to add a new item.",
});


const welcome3 = new Item({
  name: "<-- Hit this checkbox to delete an item.",
});


const welcome4 = new Item({
  name: "Press \"Time For Some Celebrity Quotes!\" button multiple times, you will get different quotes!",
});

const welcome = [welcome1, welcome2, welcome3, welcome4];


const listSchema = {
  name: String,
  email: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);


let temp = "";
let weatherDescription = "";
let icon = "";
let imageURL = "";
let place = "";
var ipAddr;
let emailAddr;



app.get("/", function(req, res) {
  //UC
  ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  //UC
  let ipurl = "https://api.ipstack.com/"+ipAddr+"?access_key=?&fields=city,region_name";

  //Test
  // let ipurl = "https://api.ipstack.com/24.75.195.117?access_key=?&fields=city,region_name";


  https.get(ipurl, function(response) {
    response.on("data", function(data) {
      //Get user location
      let ipData = JSON.parse(data);

      //UC
      place = ipData.city + ", " + ipData.region_name;

      //Test
      // place = "Alpine, Texas";

      //Get current weather
      let apiID = "?";
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
          place = weatherData.name;
          temp = parseInt(weatherData.main.temp);
          weatherDescription = weatherData.weather[0].description;
          icon = weatherData.weather[0].icon;
          imageURL = "https://openweathermap.org/img/wn/" + icon + ".png";

        });
      });
    });
  });

  res.render("login", {
    weather: weatherDescription,
    temperature: temp,
    imgURL: imageURL,
    cityName: place,
  });

});


app.get("/lists/:customize", function(req, res) {
  const userName = _.lowerCase(req.params.customize);
  const emailPerm = _.lowerCase(emailAddr);

  //UC
  ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var templist = ipAddr.split(",");
    ipAddr = templist[templist.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  //UC
  let ipurl = "https://api.ipstack.com/"+ipAddr+"?access_key=?&fields=city,region_name";


  //Test
  // let ipurl = "https://api.ipstack.com/24.75.195.117?access_key=?&fields=city,region_name";


  https.get(ipurl, function(response) {
    response.on("data", function(data) {
      //Get user location
      let ipData = JSON.parse(data);

      //UC
      place = ipData.city + ", " + ipData.region_name;

      //Test
      // place = "Alpine, Texas";

      //Get current weather
      let apiID = "";
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
          place = weatherData.name;
          temp = parseInt(weatherData.main.temp);
          weatherDescription = weatherData.weather[0].description;
          icon = weatherData.weather[0].icon;
          imageURL = "https://openweathermap.org/img/wn/" + icon + ".png";

        });
      });
    });
  });

  List.findOne({name: userName}, function(err, foundList) {
    if (!err) {
      if (!foundList) {

        //Create a new list
        const list = new List ({
          name: userName,
          email: emailPerm,
          items: welcome
        });

        list.save();
        res.redirect("/lists/" + userName);
      } else {
        //Show an existing list
        res.render("list", {
          newTasks: foundList.items,
          weather: weatherDescription,
          temperature: temp,
          imgURL: imageURL,
          cityName: place,
          emailID: foundList.email,
          userName: foundList.name,
        });
      }
    }
  });

});


app.post("/login", function(req, res) {
  emailAddr = _.lowerCase(req.body.emailAddr);
  const userName = emailAddr;

  res.redirect("/lists/"+userName);
});



//Check which button is pressed.
app.post("/list", function(req, res) {
  const buttonValue = req.body.button;
  const userName = req.body.userName;
  const task = req.body.newItem;

  //Create new task to DB
  const item = new Item({
    name: task,
    email: buttonValue,
  });

  if (buttonValue === "signup") {
    res.redirect("https://signup-page-for-q-and-e.herokuapp.com/");
  } else {

    //Add new task to DB
    List.findOne({email: buttonValue}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/lists/" + foundList.name);
    });
  }
});

app.post("/delete", function(req, res) {
  const checkedTaskID = req.body.checkbox;
  const userName = req.body.userName;
  const inputID = req.body.emailID;

  //1. First find the object in lists collection using customer's email address.
  //2. Then pull the item from the items array that has the ID of checkedTaskID.
  List.findOneAndUpdate({email: inputID}, {$pull: {items: {_id: checkedTaskID}}}, function(err, foundList){
    if(!err){
      res.redirect("/lists/" + foundList.name);
    }
  });


});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started successfully.");
});
