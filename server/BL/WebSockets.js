const conversationDAL = require("../DAL/conversationsDAL");

const onlineUsers = [];

exports.sockets = (socket) => {
  socket.on("username", ({ UserName }) => {
    var found = false;
    onlineUsers.forEach((user, index) => {
      if (user.UserName == UserName) {
        onlineUsers[index] = { UserName, SocketId: socket.id };
        found = true;
      }
    });
    if (found == false) onlineUsers.push({ UserName, SocketId: socket.id });
    onlineUsers.forEach((x) => console.log(x));
  });
  //https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png

  // to individual socketid (private message)
  socket.on("private", async (newMessage) => {
    // console.log(newMessage);
    let user = onlineUsers.filter((x) => x.UserName == newMessage.Addressee);
    if (user[0]) {
      // console.log(user[0]);
      socket.to(user[0].SocketId).emit("private", newMessage);
    }

    let obj = {
      UserA: newMessage.Sender,
      UserB: newMessage.Addressee,
      Chats: [newMessage],
    };
    await conversationDAL.addConversation(obj);
  });

  //remove user fron onlineUsers when user disconnect
  socket.on("disconnect", async function () {
    // var connectionMessage = socket.username + " Disconnected from Socket " + socket.id;
    console.log(" Disconnected from Socket ");
    onlineUsers.forEach((user, index) => {
      if (user.SocketId === socket.id) {
        onlineUsers.splice(index, 1);
      }
    });
    let chat = await conversationDAL.getConversationByUserName("avi@");
    // console.log(chat);
    // onlineUsers.forEach((x) => console.log(x));
    // console.log("length of onlineUsers: " + onlineUsers.length);
  });
};
