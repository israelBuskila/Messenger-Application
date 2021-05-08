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
    let search = await conversationDAL.getConversationByUsersName(
      newMessage.Sender,
      newMessage.Addressee
    );

    if (search.length > 0) {
      if (search[0].BlockedBy.length == 0) {
        let user = onlineUsers.filter(
          (x) => x.UserName == newMessage.Addressee
        );
        if (user[0]) {
          socket.to(user[0].SocketId).emit("private", newMessage);
        }
        let id = search[0]._id;
        let arr = search[0].Chat;
        arr.push(newMessage);
        await conversationDAL.updateConversation(id, {
          UserA: search[0].UserA,
          UserB: search[0].UserB,
          Chat: arr,
          Type: search[0].Type,
          BlockedBy: search[0].BlockedBy,
        });
      }
      // else if (search[0].BlockedBy.length > 0) {
      //   let user = onlineUsers.filter((x) => x.UserName == newMessage.Sender);
      //   if (user[0]) {
      //     socket.to(user[0].SocketId).emit("private", {
      //       Message: "The message was not sent because this chat is blocked",
      //     });
      //   }
      // }
    } else {
      let obj = {
        UserA: newMessage.Sender,
        UserB: newMessage.Addressee,
        Chat: [newMessage],
        Type: newMessage.Type,
        BlockedBy: search[0].BlockedBy,
      };
      await conversationDAL.addConversation(obj);
    }
  });

  //recive: newgroup, members
  //newgroup = Admin(array of admins), title = name of the group, messages
  //members = aray of users that members in this group
  socket.on("createGroup", async (newGroup) => {
    let resp = await groupDAL.addGroup(newGroup);
 
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
        };
        await usersLoginDAL.updateUserLogin(user[0]._id, obj);
      }
    });
  });

  socket.on("groupMessage", async (newMessage) => {
    let group = await groupDAL.getGroupById(newMessage.ID);

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

  socket.on("blockUser", async (blockInfo) => {
    let search = await conversationDAL.getConversationByUsersName(
      blockInfo.Sender,
      blockInfo.Addressee
    );

    if (search.length > 0) {
      let arr = search[0].Chat;
      let listBlocked = [...search[0].BlockedBy];
      let found = listBlocked.find((x) => x == blockInfo.Sender);

      if (found == blockInfo.Sender) {
        listBlocked = search[0].BlockedBy.filter((u) => u != blockInfo.Sender);
        onlineUsers.forEach((x) => {
          if (x.UserName == blockInfo.Addressee) {
            socket.to(x.SocketId).emit("private", {
              Sender: blockInfo.Sender,
              Message: blockInfo.Sender + " has unblocked this chat",
              Addressee: blockInfo.Addressee,
              TimeStamp: blockInfo.time,
            });
          } else if (x.UserName == blockInfo.Sender) {
            console.log(x.SocketId);
            socket.emit("private", {
              Sender: blockInfo.Addressee,
              Message: blockInfo.Sender + " has unblocked this chat",
              Addressee: blockInfo.Sender,
              TimeStamp: blockInfo.time,
            });
          }
        });
        arr.push({
          Sender: blockInfo.Sender,
          Message: blockInfo.Sender + " has unblocked this chat",
          Addressee: blockInfo.Addressee,
          TimeStamp: blockInfo.time,
        });
      } else if (found == undefined) {
        listBlocked.push(blockInfo.Sender);
        onlineUsers.forEach((x) => {
          if (x.UserName == blockInfo.Addressee) {
            socket.to(x.SocketId).emit("private", {
              Sender: blockInfo.Sender,
              Message: blockInfo.Sender + "  blocked this chat",
              Addressee: blockInfo.Addressee,
              TimeStamp: blockInfo.Addressee.time,
            });
          } else if (x.UserName == blockInfo.Sender) {
            console.log(x.SocketId);
            socket.emit("private", {
              Sender: blockInfo.Addressee,
              Message: blockInfo.Sender + "  blocked this chat",
              Addressee: blockInfo.Sender,
              TimeStamp: blockInfo.Addressee.time,
            });
          }
        });
        arr.push({
          Sender: blockInfo.Sender,
          Message: blockInfo.Sender + "  blocked this chat",
          Addressee: blockInfo.Addressee,
          TimeStamp: blockInfo.Addressee.time,
        });
      }
      await conversationDAL.updateConversation(search[0]._id, {
        UserA: search[0].UserA,
        UserB: search[0].UserB,
        Chat: arr,
        Type: search[0].Type,
        BlockedBy: listBlocked,
      });
    }
  });

  //update in DB that 
  socket.on("exitGroup", async (exitGroup) => {
    console.log(exitGroup);
    let user = await usersLoginDAL.getUserByUserName(exitGroup.UserName);
    if (user[0]) {
      let groups = user[0].Groups.filter((g) => g.Id != exitGroup.ID);

      let updateUser = {
        FirstName: user[0].FirstName,
        LastName: user[0].LastName,
        UserName: user[0].UserName,
        Password: user[0].Password,
        Groups: groups,
      };
      await usersLoginDAL.updateUserLogin(user[0]._id, updateUser);
    }
    let group = await groupDAL.getGroupById(exitGroup.ID);
    console.log(group);

    let members = group.Members.filter((m) => m != exitGroup.UserName);
    let admins = group.Admins.filter((a) => a != exitGroup.UserName);
    if (admins.length == 0 && members.length > 0) {
      admins.push(members[0]);
    }
   
    let updateGroup = {
      Title: group.Title,
      Admins: admins,
      Members: members,
      Chat: group.Chat,
      Type: group.Type,
    };
    await groupDAL.updateGroup(exitGroup.ID, updateGroup);
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
