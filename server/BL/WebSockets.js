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
        Type: search[0].Type,
      });
    } else {
      let obj = {
        UserA: newMessage.Sender,
        UserB: newMessage.Addressee,
        Chat: [newMessage],
        Type: newMessage.Type,
      };
      await conversationDAL.addConversation(obj);
    }
  });

  //recive: newgroup, members
  //newgroup = Admin(array of admins), title = name of the group, messages
  //members = aray of users that members in this group
  socket.on("createGroup", async (newGroup) => {
    console.log("clicked");
    let resp = await groupDAL.addGroup(newGroup);
    console.log(resp);
    newGroup.Members.forEach(async (m) => {
      let user = await usersLoginDAL.getUserByUserName(m);
      console.log(user);
      if (user.length > 0) {
        let obj = {
          FirstName: user[0].FirstName,
          LastName: user[0].LastName,
          UserName: user[0].UserName,
          Password: user[0].Password,
          Groups: [...user[0].Groups, { Id: resp._id, Title: resp.Title }],
          Type: "group",
        };
        await usersLoginDAL.updateUserLogin(user[0]._id, obj);
      }
    });
  });

  socket.on("groupMessage", async (newMessage) => {
    console.log(newMessage);
    let group = await groupDAL.getGroupById(newMessage.ID);
    console.log(group);
    onlineUsers.forEach((user) => {
      group.Members.forEach((member) => {
        if (member === user.UserName) {
          socket.to(user.SocketId).emit("groupMessage", newMessage);
        }
      });
    });
    let temp = group.Chat;
    temp.push(newMessage);
    let obj = {
      Title: group.Title,
      Admins: group.Admins,
      Members: group.Members,
      Chat: temp,
      Type: group.Type,
    };
    await groupDAL.updateGroup(newMessage.ID, obj);
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
