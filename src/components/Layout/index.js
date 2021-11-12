import React from "react";
import PropTypes from 'prop-types';
import {
    Container, Typography, Box
} from "@material-ui/core";
import Header from "../Navigation/Header";
import Navbar from "../Navigation/Navbar";
import Ad from "../Ad";
import { useStyles } from "./styles";
import { SocketContext, socket } from "../../context/socket";

const Layout = ({ title, children, ad }) => {
    const classes = useStyles();
    
    return (
        <SocketContext.Provider value={socket}>
        <div className={classes.layout}>
            <Header />
            {ad && (
                <Ad className={classes.ad} href="/" >
                    { ad }
                </Ad>
            )}
            <Container>
                <Box m="auto" >
                    <Typography className={classes.title} variant="h4" noWrap>
                        { title }
                    </Typography>

                    { children }
                </Box>
            </Container>
            <Navbar />
        </div>
        </SocketContext.Provider>
    )
}

Layout.propTypes = {
    title: PropTypes.string, 
    children: PropTypes.node.isRequired, 
    ad: PropTypes.string,
};
  
Layout.defaultProps = {
    title: '',
    ad: ''
};

export default Layout;