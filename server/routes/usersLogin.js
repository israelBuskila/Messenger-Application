const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../BL/authntication");
const usersLoginDAL = require("../DAL/usersLoginDAL");

router.post("/login", async (req, res, next) => {
  const user = {
    UserName: req.body.UserName,
    Password: req.body.Password,
  };
  let a = await auth.authenticationUser(req.body.UserName, req.body.Password);
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ a, token });
  });
});

router.get("/users", async (req, res, next) => {
  res.send(await usersLoginDAL.getAllUsersLogin());
});

router.post("/api", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "posts created...",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.post("/createAccount", async (req, res, next) => {
  let a = await auth.createUser(req.body);

  return res.send(a);
});

module.exports = router;
