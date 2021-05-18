const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const conversatiosDAL = require("../DAL/conversationsDAL");
const groupsDAL = require("../DAL/groupsDAL");
const usersLoginDAL = require("../DAL/usersLoginDAL");

router.post("/", async (req, res, next) => {
 
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, "secretkey", async (err, decoded) => {
    if (err)
      return res
        .status(501)
        .send({ auth: false, message: "Failed to authntication" });
    let chats = await conversatiosDAL.getConversationsByUserName(
      req.body.UserName
    );
    let user = await usersLoginDAL.getUserByUserName(req.body.UserName);

    let data_chat = await Promise.all(
      user[0].Groups.map(async (x) =>
        chats.push(await groupsDAL.getGroupById(x.Id))
      )
    );

    res.status(200).send(chats);
  });
});

module.exports = router;
