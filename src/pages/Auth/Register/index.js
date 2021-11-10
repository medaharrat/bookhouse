import React, { useState } from "react";
import Layout from "../../../components/Layout";
import {
    Typography, TextField, Button, Grid, FormControl, Link
} from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "./styles";

const Register = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`> Register ${JSON.stringify(values)}`)
    };

    return (
        <Layout>
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
                            variant="outlined" onChange={handleChange('firstName')}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField 
                            id="last-name" label="Last name" 
                            variant="outlined" onChange={handleChange('lastName')}
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