import React from "react";
import PropTypes from 'prop-types';
import {
    AppBar, IconButton, Badge, Toolbar, Button, Link
} from "@material-ui/core";
import {
    DraftsOutlined, DateRangeOutlined, NotificationsNoneOutlined
} from "@material-ui/icons";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useAuthState, logout, useAuthDispatch } from '../../../context';
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from '../../Avatar';
import { useStyles } from "./styles";

const Header = ({ fixed }) => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    // Read dispatch method from context
    const dispatch = useAuthDispatch() 
    // Read user details from context
    const userDetails = useAuthState() 

    // Log out
    const handleLogout = () => {
        // Call the logout action
        logout(dispatch) 
        // Navigate on logout
        navigate('/') 
    }

    const handleBack = () => {
        navigate(-1);
    }
    return (
        <>
        <AppBar position={fixed ? "fixed" : "static"} className={classes.header}>
            <Toolbar>
                {userDetails.token ? 
                    location.pathname === "/p/2" ? (
                        <>
                            <IconButton
                                aria-label="back"
                                color="inherit"
                                onClick={handleBack}
                                className={classes.icon}
                                disableRipple
                            >
                                <ArrowBackOutlinedIcon/>
                            </IconButton>
                            <div className={classes.grow} />
                            <IconButton
                                aria-label="settings"
                                color="inherit"
                                className={classes.icon}
                                disableRipple
                                onClick={handleLogout}
                            >
                                <ExitToAppOutlinedIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Link href="/p/2" underline="none">
                                <IconButton
                                    aria-label="account"
                                    color="inherit"
                                >
                                    <Avatar nav image="https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg"/>
                                </IconButton>
                            </Link>
                            <div className={classes.grow} />
                            <IconButton
                                aria-label="inbox"
                                color="inherit"
                                className={classes.icon}
                                disableRipple
                            >
                                <Badge 
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    color="primary"
                                >
                                    <DraftsOutlined/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="notifications"
                                color="inherit"
                                className={classes.icon}
                                disableRipple
                            >
                                <Badge 
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={1}
                                    color="primary"
                                >
                                    <NotificationsNoneOutlined/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="calendar"
                                color="inherit"
                                className={classes.icon}
                                disableRipple
                            >
                                <DateRangeOutlined/>
                            </IconButton>
                        </>
                    ):(
                    <>
                        <div className={classes.grow} />
                        <Link href="/login" underline="none">
                            <Button variant="outlined" color="primary" disableRipple disableElevation>
                                Join
                            </Button>
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
        {
            fixed && (
                <div className={classes.divider} />
            )
        }
        </>
    )
}

Header.propTypes = {
    fixed: PropTypes.bool,
};

export default Header;