import React from "react";
import PropTypes from 'prop-types';
import {
    Container, Typography, Box, Popover
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Header from "../Navigation/Header";
import Navbar from "../Navigation/Navbar";
import Ad from "../Ad";
import { useStyles } from "./styles";
import { SocketContext, socket } from "../../context";

const Layout = ({ title, children, ad, alert }) => {
    const classes = useStyles();
    
    return (
        <SocketContext.Provider value={socket}>
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
            <Navbar />

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
        </SocketContext.Provider>
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