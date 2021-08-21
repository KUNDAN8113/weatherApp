const express = require("express");
const https = require("https");
const bodyparser=require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req, res) {
res.sendFile(__dirname+"/index.html");


});

app.post("/",function(req,res){


  const city=req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=98cd55444dedb9d044f235da0ab157dd&units=metric";
  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const descrip = weatherData.weather[0].description;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";


      res.write("<h1>The temperature in "+city+" is "+temp+" degrees celsius.</h1>");
      res.write("<p>The weather of "+city+ " has "+descrip+"<p>");
      res.write("<img src="+ imageUrl +">");
      res.send();
    })
  })
});





app.listen(3000, function() {
  console.log("listening at port 3000.....");
})
