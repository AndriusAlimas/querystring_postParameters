const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const app = express();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
const jsonParser = bodyParser.json();

// set view engine
app.set("view engine", "ejs");

// Middlewares
app.use("/assets", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log("Requested: " + req.url);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api", (req, res) => {
  const obj = { name: "Andrius", age: 35 };
  res.render("api", { OBJ: obj });
});

app.get("/person/:person", (req, res) => {
  res.render("person", {
    person: req.params.person,
    QRYString: req.query.city,
  });
});
// only parse when you requesting post request to this url
app.post("/register", urlencodedParser, (req, res) => {
  console.log("Form Post data");
  res.render("registration", { name: req.body.name, pw: req.body.pw });
});

app.post("/registerjson", jsonParser, (req, res) => {
  console.log("JSON data");
  console.log("name " + req.body.name);
  console.log("password " + req.body.pw);

  res.render("registrationJSON", { name: req.body.name, pw: req.body.pw });
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port);
