import React from "react";
import PropTypes from 'prop-types';
import {
    Container, Typography, Box
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Header from "../Navigation/Header";
import Navbar from "../Navigation/Navbar";
import Ad from "../Ad";
import { useStyles } from "./styles";
import { useAuthState } from "../../context";
import { useLocation } from "react-router-dom";

const Layout = ({ title, children, ad, alert }) => {
    const classes = useStyles();
    const location = useLocation();
    // Read user details from context
    const auth = useAuthState()
    // Remove navbar when in a room
    const inRoom = location.pathname.split('/')[1] === 'r';

    return (

        <div className={classes.layout}>
            {/* Header */}
            <Header fixed/>

            {/* Ads */}
            {ad && (
                <Ad className={classes.ad} href="/" >
                    { ad }
                </Ad>
            )}

            {/* Content */}
            <Container>
                <Box m="auto" >
                    <Typography className={classes.title} variant="h4" noWrap>
                        { title }
                    </Typography>
                    { children }
                </Box>
            </Container>

            {/* Navbar */}
            {auth.token && auth.user && !inRoom &&(
                <Navbar />
            )}

            {/* Alerts */}
            {alert.title && (
            <div className={classes.alert}>
                <Alert
                    variant="outlined"
                    severity={alert.type}
                >
                    { alert.title }
                </Alert>    
            </div>          
            )}
        </div>
        
    )
}

Layout.propTypes = {
    title: PropTypes.string, 
    children: PropTypes.node.isRequired, 
    ad: PropTypes.string,
    alert: PropTypes.object,
};
  
Layout.defaultProps = {
    title: '',
    ad: '',
    alert: {
        title: '',
        type: null
    }
};

export default Layout;