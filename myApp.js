let express = require("express");
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = "HELLO JSON";
  }

  res.json({ message: message });
});

function middleware(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.get("/now", middleware, function(req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word });
});

module.exports = app;
