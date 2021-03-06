import React, { useState } from "react";
import {
  Button,
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,

} from "@material-ui/core";
import Input from "./Input";
import { GoogleLogin } from 'react-google-login'
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./Styles";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Icon from './Icon'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const [showPassword, SetShowPassword] = useState(false);

  const googleSuccess = async (res) => {

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error);
    }

  }
  const googleFailure = async (res) => {
    console.log(res);
    console.log('Google sign in failed');
  }

  const handleShowPassword = () => {
    SetShowPassword((prev) => !prev);
  };

  const handleSubmit = () => { };

  const handleChange = () => { };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };

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
          <GoogleLogin clientId="377386531731-nfueq28h4q7r4sdmbie5ej72928e45bj.apps.googleusercontent.com" render={(renderProps) => (
            <Button
              className={classes.googleButton}
              color='primary'
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant='contained' >
              Google Sign In
            </Button>
          )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end" >
            <Button onClick={switchMode} fullWidth >
              {
                isSignup ?
                  'Already have an account? Sign In' : 'Dont have an account? SignUp'
              }
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
