const conversationsDAL = require("../DAL/conversationsDAL");
const usersLoginDAL = require("../DAL/usersLoginDAL");
const groupsDAL = require("../DAL/groupsDAL");

exports.initforNewUser = async (username) => {
  let users = await usersLoginDAL.getAllUsersLogin();
  var t = new Date();
  var time =
    t.getDate() +
    "/" +
    (t.getMonth() + 1) +
    "/" +
    t.getFullYear() +
    "  " +
    t.getHours() +
    ":" +
    t.getMinutes();
  users.forEach(async (x) => {
    let obj = {
      UserA: username,
      UserB: x.UserName,
      Chat: [
        {
          Sender: username,
          Message: "Say hello to your friend",
          Addressee: x.UserName,
          TimeStamp: time,
        },
      ],
      Type: "private messages",
    };
    await conversationsDAL.addConversation(obj);
  });
};

exports.getAllChats = async (userName) => {
 
  let user = await usersLoginDAL.getUserByUserName(userName);
  user[0].Groups.map((x) => {
    return groupsDAL.getGroupById(x.Id).then((g) => m.push(g));
  });
  return m;
};
