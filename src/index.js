const express = require("express");
const app = express();
const bot = require("./bot");

// parse json body  for post request
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/telegram-bot-webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
