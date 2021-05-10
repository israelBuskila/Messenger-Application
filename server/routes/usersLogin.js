const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../BL/authntication");

router.post("/login", async (req, res, next) => {
  const user = {
    UserName: req.body.UserName,
    Password: req.body.Password,
  };

  let authResult = await auth.authenticationUser(
    req.body.UserName,
    req.body.Password
  );
  let tokenData = jwt.sign({ user: user }, "secretkey");
  res.send({ authResult: authResult, token: tokenData });
});

router.post("/createAccount", async (req, res, next) => {
  try {
    let a = await auth.createUser(req.body);
    return res.send(a);
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
});

module.exports = router;
