const conversationDAL = require("../DAL/conversationsDAL");
const groupDAL = require("../DAL/groupsDAL");
const usersLoginDAL = require("../DAL/usersLoginDAL");

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
    let user = onlineUsers.filter((x) => x.UserName == newMessage.Addressee);
    if (user[0]) {
      socket.to(user[0].SocketId).emit("private", newMessage);
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
        Chat: arr,
      });
    } else {
      let obj = {
        UserA: newMessage.Sender,
        UserB: newMessage.Addressee,
        Chat: [newMessage],
      };
      await conversationDAL.addConversation(obj);
    }
  });

  socket.on("createGroup", async (newGroup, members) => {
    console.log("clicked");
    let resp = await groupDAL.addGroup(newGroup);
    console.log(resp);
  });

  //remove user fron onlineUsers when user disconnect
  socket.on("disconnect", async function () {
    console.log(" Disconnected from Socket ");
    onlineUsers.forEach((user, index) => {
      if (user.SocketId === socket.id) {
        onlineUsers.splice(index, 1);
      }
    });
  });
};
