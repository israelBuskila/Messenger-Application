const usersLoginDAL = require("../DAL/usersLoginDAL");
const conversationsBL = require("./conversations");



exports.authenticationUser = async (userName, password) => {
  let user = await usersLoginDAL.getUserByUserName(userName);


  if (user[0] === undefined) return "User does not exist !";
  else if (user[0].Password != password) {
    return "Incorrect password !";
  } else {
    

    return true;
  }
};

exports.createUser = async (newUser) => {
  let user = await usersLoginDAL.getUserByUserName(newUser.UserName);
  if (user[0] === undefined) {
    await conversationsBL.initforNewUser(newUser.UserName);
    let resp = await usersLoginDAL.addUserLogin(newUser);
    
    return resp;
  } else return "This UserName already exists Please choose another UserName !";
};
