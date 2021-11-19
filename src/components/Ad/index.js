import React from "react";
import PropTypes from 'prop-types';
import {
    Paper, Button, Typography
} from '@material-ui/core';
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

const Ad = ({ href, children }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.ad} elevation={0} square>
            <Typography variant="body2" className={classes.desc}>
                { children }
            </Typography>
            
            <Button 
                className={classes.btn} 
                component={Link} 
                to="#" 
                variant="outlined" 
                disableRipple
            >
                Learn more 
            </Button>
        </Paper>
    )
}

Ad.propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
};
  
Ad.defaultProps = {
    href: '#',
};
  
export default Ad;