import React from "react";
import {
    Typography, Button
} from '@material-ui/core';
import Layout from "../../components/Layout";
import { useStyles } from "./styles";

const SplashScreen = () => {
    const classes = useStyles();
    
    return (
        <Layout>
            <div>
                <Typography variant="h3" className={classes.title}>
                    When a good book ends, the conversation begins.
                </Typography>
                <Button 
                    className={classes.btn} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    disableRipple
                    disableElevation
                >
                    Find your club
                </Button>
            </div>
            <div className={classes.imgWrap}>
                <img className={classes.img} alt="landing" src="./img/landing.jpg" />
            </div>
            <div className={classes.divider} />
        </Layout>
    );
}

export default SplashScreen;