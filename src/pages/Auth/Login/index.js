import React, { useState } from "react";
import { login, useAuthState, useAuthDispatch } from '../../../context';
import Layout from "../../../components/Layout";
import {
    Typography, TextField, Button, Grid, FormControl, Link,
    CircularProgress
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./styles";

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({title: '', type: 'warning'})
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // Get the dispatch method from the useDispatch custom hook
    const dispatch = useAuthDispatch()
    // Read the values of loading and error from context
    const { loading, error } = useAuthState() 

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        try { 
            // login action makes the request and handles all the neccessary state changes
            let response = await login(dispatch, values) 
            if (!response) {
                setAlert({...alert, title: error ? error : 'Email or password is wrong'})
            } else {
                navigate('/home')
            }
        } catch (error) {
            setAlert({...alert, title: error})
            console.log(`Login error: ${error}`);
        }
    };

    return (
        <Layout alert={alert}>
            <Grid
                container
                spacing={2} 
                className={classes.form}
            >
                <Grid item lg={12}>
                    <Typography variant="h3" className={classes.title}>
                        Sign in
                    </Typography>
                    <Typography variant="body2" className={classes.subtitle}>
                        Welcome back!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField 
                            id="email" type="email" 
                            label="Email" variant="outlined" onChange={handleChange('email')}
                        />
                    </FormControl>                
                </Grid>
                <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField 
                            id="password" type="password" 
                            label="Password" variant="outlined" onChange={handleChange('password')} 
                        />
                    </FormControl>                
                </Grid>
                <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <Button 
                            className={classes.btn} 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            disableRipple
                            disableElevation
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            Sign in
                        </Button>
                        { loading &&  (<CircularProgress size={24} className={classes.loading} />) }
                    </FormControl>     
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" className={clsx(classes.subtitle, classes.center)}>
                        Don't have an account? <Link href="/register">register</Link>.
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Login;