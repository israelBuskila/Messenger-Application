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

  // to individual socketid (private message)
  socket.on("private", async (newMessage) => {
    console.log(newMessage);
    console.log(onlineUsers);
    let user = onlineUsers.filter((x) => x.UserName == newMessage.Addressee);
    if (user[0]) {
      socket.to(user[0].SocketId).emit("private", newMessage);
      console.log("m:"+newMessage);
    }

    let search = await conversationDAL.getConversationByUsersName(
      newMessage.Sender,
      newMessage.Addressee
    );

    if (search.length > 0) {
      let id = search[0]._id;
      let arr = search[0].Chat;
      arr.push(newMessage);
      await conversationDAL.updateConversation(id, {
        UserA: search[0].UserA,
        UserB: search[0].UserB,
        Chats: arr,
      });
    } else {
      let obj = {
        UserA: newMessage.Sender,
        UserB: newMessage.Addressee,
        Chats: [newMessage],
      };
      await conversationDAL.addConversation(obj);
    }
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
    // let chat = await conversationDAL.getConversationByUsersName("avi@", "einav");
    // console.log(chat);
    // onlineUsers.forEach((x) => console.log(x));
    // console.log("length of onlineUsers: " + onlineUsers.length);
  });
};
