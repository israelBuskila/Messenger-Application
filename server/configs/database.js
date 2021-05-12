const mongoose = require("mongoose");
//"mongodb://localhost:27017/MessengerAplication"
const DB = "mongodb+srv://admin:jiYShSzqD5bCwAM@messengerapp.oaigz.mongodb.net/MessengerApplication?retryWrites=true&w=majority";
mongoose.connect(
  DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);
