const express = require("express");
const router = express.Router();
const conversatiosDAL = require("../DAL/conversationsDAL");

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let resp = await conversatiosDAL.getConversationByUserName(
      req.body.UserName
    );
    resp.forEach((element) => {
      console.log(element);
    });
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
});

module.exports = router;
