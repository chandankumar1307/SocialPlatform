import React, { useState } from "react";
import {
  Button,
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import Input from "./Input";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./Styles";

const Auth = () => {
  const isSignup = true;
  const classes = useStyles();
  const [showPassword, SetShowPassword] = useState(false);

  const handleShowPassword = () => {
    SetShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {};

  const handleChange = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
