import React, { useState } from "react";
// import { withStyles } from "material-ui/styles/withStyles";

import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
} from "@material-ui/core";
import style from 'styled-components'


import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import authService from "../services/authService";
import { useStyles } from "../style/styleLogin";
import Box from "@material-ui/core/Box";

// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";

function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const submit = async () => {
    let obj = {
      UserName: userName,
      Password: password,
    };
    let response = await axios.post(
      "https://messengerapplication-server.herokuapp.com/login",
      obj
    );

    if (response.data.authResult === true) {
      sessionStorage["userInfo"] = userName;

      authService.saveToken(response.data.token);

      return history.push("/main");
    } else if (response.data.authResult === "User does not exist !") {
      alert(response.data.authResult);
      return history.push("/");
    } else {
      alert("Incorrect password !");
      return history.push("/");
    }
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          I.B
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
          label="Enter your username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          autoComplete="username"
  
        />
        <TextField
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Enter your password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="current-password"
        />
        <MyButton
          className={classes.submit}
          type="button"
          value="login"
          onClick={submit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </MyButton>
        <Grid item>
          <Link to={"/signUp"} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {/* <Typography component="h5" variant="h5">
      {err}
    </Typography> */}
    </Container>
  );
}

export default Login;


const MyButton = style(Button)`
 background-color: #00bfa5;
 &:hover{
  background-color: #00bfa5;
  opacity: 0.9;
}
`
// const MyTextField = style(TextField)`
// color:  #00bfa5;
// border-color: 'green !important'
// &:focus  {
//   background-color: #00bfa5;
// }
// `
// const CssTextField = withStyles({
//   root: {
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'orange',
//       }
//   },
// }})

