import React from "react";
import {
    AppBar, IconButton, Badge, Toolbar, Button, Link
} from "@material-ui/core";
import {
    DraftsOutlined, DateRangeOutlined, NotificationsNoneOutlined
} from "@material-ui/icons";
import { 
    useAuthState 
} from '../../../context';
import Avatar from '../../Avatar';
import { useStyles } from "./styles";

const Header = () => {
    const classes = useStyles();

    // Read user details from context
    const userDetails = useAuthState() 

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                {userDetails.token ? (
                    <>
                        <IconButton
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Avatar nav image="https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg"/>
                        </IconButton>
                        <div className={classes.grow} />
                        <IconButton
                            aria-label="inbox"
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.icon}
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
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.icon}
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
                        {/* 
                        * Header actions 
                        ===> Calendar 
                        <IconButton
                            aria-label="calendar"
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.icon}
                        >
                            <DateRangeOutlined/>
                        </IconButton>
                        */}
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
    )
}

export default Header;