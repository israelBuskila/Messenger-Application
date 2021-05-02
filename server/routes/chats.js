const express = require("express");
const router = express.Router();
const conversatiosDAL = require("../DAL/conversationsDAL");
const groupsDAL = require("../DAL/groupsDAL");
const usersLoginDAL = require("../DAL/usersLoginDAL");

router.post("/", async (req, res, next) => {
  try {
    let chats = await conversatiosDAL.getConversationsByUserName(
      req.body.UserName
    );
    let user = await usersLoginDAL.getUserByUserName(req.body.UserName);

    let data_chat = await Promise.all(
      user[0].Groups.map(async (x) =>
        chats.push(await groupsDAL.getGroupById(x.Id))
      )
    );

    res.send(chats);
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
});

module.exports = router;
