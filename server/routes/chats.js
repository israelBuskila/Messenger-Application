const express = require("express");
const router = express.Router();
const conversatiosDAL = require("../DAL/conversationsDAL");

router.post("/", async (req, res, next) => {
  try {
    let resp = await conversatiosDAL.getConversationsByUserName(
      req.body.UserName
    );

    res.send(resp);
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
});

module.exports = router;
