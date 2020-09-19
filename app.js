const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mongoose = require("mongoose");



const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use MongoDB to store lists
mongoose.connect("mongodb+srv://admin-emily:PUP267me@to-do-list.d7vdq.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//Setup item schema
const itemSchema = {
  name: String,
  email: String,
  ip: String
};


const Item = mongoose.model("Item", itemSchema);


let temp = "";
let weatherDescription = "";
let icon = "";
let imageURL = "";
let place = "";
var ipAddr;
let emailAddr;
let cusIP;


app.get("/", function(req, res) {
  cusIP = req.body.ipName;
  //UC
  ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  //UC
  let ipurl = "https://api.ipstack.com/"+ipAddr+"?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";
  //let ipurl = "https://api.ipstack.com/"+cusIP+"?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";

  //Test
  //let ipurl = "https://api.ipstack.com/24.75.195.117?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";


  https.get(ipurl, function(response) {
    response.on("data", function(data) {
      //Get user location
      let ipData = JSON.parse(data);

      //UC
      place = ipData.city + ", " + ipData.region_name;

      //Test
      //place = "Alpine, Texas";

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
    ipName: ipAddr
  });

});


app.get("/lists/:customize", function(req, res) {
  cusIP = req.params.topic;
  const emailPerm = emailAddr;
  //UC
  ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  //UC
  let ipurl = "https://api.ipstack.com/"+ipAddr+"?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";
  //let ipurl = "https://api.ipstack.com/"+cusIP+"?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";


  //Test
  //let ipurl = "https://api.ipstack.com/24.75.195.117?access_key=eb287c9a351aa80dd5b81e4fa9a45f6b&fields=city,region_name";


  https.get(ipurl, function(response) {
    response.on("data", function(data) {
      //Get user location
      let ipData = JSON.parse(data);

      //UC
      place = ipData.city + ", " + ipData.region_name;

      //Test
      //place = "Alpine, Texas";

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
          place = weatherData.name;
          temp = parseInt(weatherData.main.temp);
          weatherDescription = weatherData.weather[0].description;
          icon = weatherData.weather[0].icon;
          imageURL = "https://openweathermap.org/img/wn/" + icon + ".png";

        });
      });
    });
  });


  Item.find({$or:[{ip: cusIP}, {email: emailPerm}]}, function(err, items) {
    if (!err) {
      res.render("list", {
        newTasks: items,
        weather: weatherDescription,
        temperature: temp,
        imgURL: imageURL,
        cityName: place,
        emailAddress: emailAddr,
        ipID: cusIP
      });
    }
  });

});


app.post("/login", function(req, res) {
  emailAddr = req.body.emailAddr;
  cusIP = req.body.ipName;

  Item.find({email: emailAddr}, function(err, items) {
    if (!err) {
      if (items.length == 0) {
        const welcome1 = new Item({
          name: "Welcome to your to-do list!",
          email: emailAddr,
          ip: cusIP
        });


        const welcome2 = new Item({
          name: "Hit Enter or the + button to add a new item.",
          email: emailAddr,
          ip: cusIP
        });


        const welcome3 = new Item({
          name: "<-- Hit this checkbox to delete an item.",
          email: emailAddr,
          ip: cusIP
        });


        const welcome4 = new Item({
          name: "Press \"Time For Some Celebrity Quotes!\" button multiple times, you will get different quotes!",
          email: emailAddr,
          ip: cusIP
        });

        const welcome = [welcome1, welcome2, welcome3, welcome4];

        Item.insertMany(welcome, function(err) {
          if (!err) {
            console.log("successfully insert welcome.");
          }
        });
      }
    }
  });
  res.redirect("/lists/"+cusIP);
});

app.post("/loginagain", function(req, res) {
  emailAddr = req.body.emailAddr;
  res.redirect("/lists/" + cusIP + "#loaded");
});


//Check which button is pressed.
app.post("/list", function(req, res) {
  var buttonValue = req.body.button;
  if (buttonValue === "addTask") {

    //Add new task to DB
    let task = req.body.taskName;

    const item = new Item({
      name: task,
      email: emailAddr,
      ip: cusIP
    });

    item.save();

    res.redirect("/lists/" + cusIP+ "#loaded");
  } else if (buttonValue === "signup") {
    res.redirect("https://signup-page-for-q-and-e.herokuapp.com/");
  }
});

app.post("/delete", function(req, res) {
  let checkedTaskID = req.body.checkbox;
  Item.findByIdAndRemove(checkedTaskID, function(err) {
    if (!err) {
      console.log("Item successfully deleted.");
      res.redirect("/lists/" + cusIP + "#loaded");
    }
  });
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started successfully.");
});
