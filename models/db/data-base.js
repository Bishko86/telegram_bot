const mongoose = require("mongoose");

const db = "mongodb+srv://RomanUA:fsX5sbtfrLEUSpP@cluster0.k9f32.mongodb.net/Telegram_Bot?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("mongoDB works"))
  .catch((err) => console.log("mongoDB error"));

  module.exports = mongoose
