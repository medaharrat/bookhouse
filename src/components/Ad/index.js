import React from "react";
import {
    Paper, Button, Link, Typography
} from '@material-ui/core';
import { useStyles } from "./styles";

const Ad = ({ href, children }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.ad} elevation={0} square>
            <Typography variant="body2" className={classes.desc}>
                { children }
            </Typography>
            
            <Link href={href} className={classes.link}>
                <Button className={classes.btn} variant="outlined" disableRipple>
                    Learn more 
                </Button>
            </Link>
        </Paper>
    )
}

export default Ad;