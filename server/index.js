const express = require("express");

const app = express();
/** Create socket connection */
const http = require("http").createServer(app);
// import socketio from "socket.io";
const io = require("socket.io")(http);

//import body-parser
const bodyParser = require("body-parser");

// routes
const usersLoginRoutes = require("./routes/usersLogin");

// mongo connection
require("./configs/database");

// socket configuration
const WebSockets = require("./BL/WebSockets.js");

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3001";
app.set("port", port);

// configure the body-parser
// to accept urlencoded bodies
// and json data
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use("/", usersLoginRoutes);

io.on("connection", (socket) => {
  
  // if (session.user == undefined)
  //   session.user = { SocketId: socket.id, UserName: "" };

  WebSockets.sockets(socket);
});

/** Listen on provided port, on all network interfaces. */
http.listen(port);
/** Event listener for HTTP server "listening" event. */
http.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
