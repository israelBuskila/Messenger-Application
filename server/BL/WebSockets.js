const onlineUsers = [];
exports.sockets = (socket) => {
  socket.on("username", ({ UserName }) => {
    console.log("username" + socket.id);
    var found = false;
    onlineUsers.forEach((user, index) => {
      if (user.UserName == UserName) {
        onlineUsers[index] = { UserName, SocketId: socket.id };
        found = true;
      }
    });
    if (found == false) onlineUsers.push({ UserName, SocketId: socket.id });
    console.log(onlineUsers.length);
  });
//https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png

  // to individual socketid (private message)
  socket.on(
    "private",
    ({ Sender, Message, Addressee, TimeStamp, SendOrReceive }) => {
      let user = onlineUsers.filter((x) => x.UserName == Addressee);
      if (user[0]) {
        console.log(user[0]);
        socket.to(user[0].SocketId).emit("message", {
          Sender,
          Message,
          Addressee,
          TimeStamp,
          SendOrReceive,
        });
      }

      
    }
  );
};
