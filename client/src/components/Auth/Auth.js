import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles'
import Input from './Input'
import jwtDecode from "jwt-decode";
import { useDispatch } from 'react-redux'
const Auth = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    /* Google Auth */

    const handleCallBackResponse = useCallback((response) => {
        // console.log("Encoded JWT ID token: ", response.credential);
        console.log(response);
        const userObject = jwtDecode(response.credential);
        console.log(userObject);
        if (typeof window !== "undefined") {
            localStorage.setItem("profile", userObject);
            localStorage.setItem("username", userObject.name);
            localStorage.setItem("profile", userObject.picture);
        }
        console.log(userObject.name, userObject.email, userObject.picture);
        dispatch({ type: "AUTH", data: { result: userObject, token: response.credential } });
        navigate("/");
    }, [isSignup]);

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "417769755650-4cajc4qbdsfvjscrvccasmam93elr4a8.apps.googleusercontent.com",
            callback: handleCallBackResponse,
        });

        // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        //     theme: "outline",
        //     size: "extralarge",
        // });

        google.accounts.id.prompt();
    }, [handleCallBackResponse]);

    /* Google Auth */

    const handleSubmit = () => {
    }
    const handleChange = () => { }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} />
                <Typography variant="h5">{isSignup ? 'Logout' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} autocomplete="current-password" />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" autocomplete="current-password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <Button fullWidth variant="contained" id='signInDiv'>Sign in By Google</Button> */}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}

export default Auth