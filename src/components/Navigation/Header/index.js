import React, { useContext } from "react";
import {
    AppBar, IconButton, Badge, Toolbar, Button, Link
} from "@material-ui/core";
import {
    DraftsOutlined, DateRangeOutlined, NotificationsNoneOutlined
} from "@material-ui/icons";
import Avatar from '../../Avatar';
import { GlobalContext } from "../../../context/GlobalState";
import { useStyles } from "./styles";

const Header = () => {
    const classes = useStyles();
    const { user } = useContext(GlobalContext);

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                {user.loggedIn ? (
                    <>
                        <IconButton
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Avatar nav image={user.profile_image}/>
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
                                badgeContent={1}
                            >
                                <DraftsOutlined/>
                            </Badge>
                        </IconButton>
                        {/* 
                        * Header actions 
                        ===> Notifications
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