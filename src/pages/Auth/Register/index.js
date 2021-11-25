import React, { useState } from "react";
import { register, useAuthState, useAuthDispatch } from '../../../context';
import Layout from "../../../components/Layout";
import {
    Typography, TextField, Button, Grid, FormControl, Link
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useStyles } from "./styles";

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [alert, setAlert] = useState({title: '', type: 'warning'})

    // Get the dispatch method from the useDispatch custom hook
    const dispatch = useAuthDispatch()
    // Read the values of loading and errorMessage from context
    const { loading, errorMessage } = useAuthState() 

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try { 
            // loginUser action makes the request and handles all the neccessary state changes
            let response = await register(dispatch, values) 
            if (!response) return
            // Navigate to login
            navigate('/login')
        } catch (error) {
            setAlert({...alert, title: "Something is wrong."})
            console.log(`Register error: ${error}`);
            console.log(errorMessage)
        }
        console.log(`> Register ${JSON.stringify(values)}`)
    };

    return (
        <Layout alert={alert}>
            <Grid
                container
                lg={4} md={4} xs={12}
                spacing={2} 
                className={classes.form}
            >
                <Grid item lg={12}>
                    <Typography variant="h4" className={classes.title}>
                        Create an account
                    </Typography>
                    <Typography variant="body2" className={classes.subtitle}>
                        Welcome. We’re so glad you’re here. Let’s get started by setting up your account.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField 
                            id="first-name" label="First name" 
                            variant="outlined" onChange={handleChange('firstname')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField 
                            id="last-name" label="Last name" 
                            variant="outlined" onChange={handleChange('lastname')}
                        />
                    </FormControl>
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
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Create account
                        </Button>
                    </FormControl>     
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" className={clsx(classes.subtitle, classes.center)}>
                        By creating an account, you agree to Bookhouse <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
                    </Typography>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Register;