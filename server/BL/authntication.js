const usersLoginDAL = require("../DAL/usersLoginDAL");
const conversationsBL = require("./conversations");

// const moviesBL = require("../BL/moviesBL");
// const moviesDAL = require("../DAL/moviesDAL");
// const membersDAL = require("../DAL/membersDAL");
// const membersBL = require("../BL/membersBL");

exports.authenticationUser = async (userName, password) => {
  let user = await usersLoginDAL.getUserByUserName(userName);
  // let movies = await moviesDAL.getAllMovies();
  // if (movies.length == 0) {
  //   await moviesBL.initDB();
  // }

  // let members = await membersDAL.getAllMembers();
  // if (members.length == 0) {
  //   await membersBL.initDB();
  // }

  if (user[0] === undefined) return "User does not exist !";
  else if (user[0].Password != password) {
    return "Incorrect password !";
  } else {
    // session.user.UserName = userName;

    return true;
  }
};

exports.createUser = async (newUser) => {
  let user = await usersLoginDAL.getUserByUserName(newUser.UserName);
  if (user[0] === undefined) {
    await conversationsBL.initforNewUser(newUser.UserName);
    let resp = await usersLoginDAL.addUserLogin(newUser);
    console.log(resp);
    return resp;
  } else return "This UserName already exists Please choose another UserName !";
};
