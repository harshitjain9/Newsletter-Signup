const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }
  ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/35f1828e9e";

  const options = {
    method: "POST",
    auth: "harshit1:38d54768c06b36cf7b77de9950e055a2-us2"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      const JSData = JSON.parse(data);
      console.log(JSData);
    });

  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running on port 3000");
});

//API KEY
//38d54768c06b36cf7b77de9950e055a2-us2


//list ID
// 35f1828e9e
