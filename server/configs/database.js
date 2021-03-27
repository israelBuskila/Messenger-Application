const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/MessengerAplication";
mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);
