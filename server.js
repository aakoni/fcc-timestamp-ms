const express = require("express");
const compression = require("compression");
const dateformat = require("dateformat");

let app = express();
app.use(compression());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/:timestamp", (req, res) => {
  let time = req.params.timestamp;
  if (Number(time) == NaN) {
    time = new Date(time);
  } else {
    time = new Date(Number(time));
  };
  let result = {"unix": null, "natural": null };
  if (time != 'Invalid Date') {
    result = {"unix": time.getTime(), "natural": dateformat(time, "mmmm d, yyyy")}
  }
  res.jsonp(result);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("The app is listening on port " + listener.address().port);
});