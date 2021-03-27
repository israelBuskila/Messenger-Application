const usersLoginDAL = require("../DAL/usersLoginDAL");
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
  } else return true;
};

exports.createUser = async (userName, password) => {
  let user = await usersLoginDAL.getUserByUserName(userName);
  if (user[0] === undefined) {
    let obj = {
      UserName: userName,
      Password: password,
    };

    let resp = await usersLoginDAL.addUserLogin(obj);
    console.log(resp);
    return true;
  } else return "This UserName already exists Please choose another UserName !";
};
