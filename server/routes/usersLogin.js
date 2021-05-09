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

  let authResult = await auth.authenticationUser(
    req.body.UserName,
    req.body.Password
  );
  let tokenData = jwt.sign({ user: user }, "secretkey");
  res.send({ authResult: authResult, token: tokenData });
});

router.post("/getUser", async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  let tokenData = jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authntication" });
  });
  res
    .status(200)
    .send(await usersLoginDAL.getUserByUserName(req.body.UserName));
});

// router.post("/api", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "posts created...",
//         authData,
//       });
//     }
//   });
// });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearerToken = bearerHeader.split(" ")[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

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
