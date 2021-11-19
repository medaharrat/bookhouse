import React from 'react';
import {
  AppBar, Toolbar, IconButton, Button
} from '@material-ui/core';
import {
  Home, Search, Apps
} from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useStyles } from './styles';

const NavigationBar = () => { 
  const classes = useStyles();

  const pages = [
    {title: 'Home', icon: <Home/>, link: "/"}, 
    {title: 'Search', icon: <Search/>, link: "/"}, 
    {title: 'Library', icon: <Apps/>, link: "/"}
  ];

  return (
    <AppBar className={classes.navBar}>
      <Toolbar>
        {/* Apps */}
        <div className={classes.grow}>
          <IconButton aria-label="Inbox" component={Link} to="/home" >
            <Apps/>
          </IconButton>
        </div>
        {/* Start a room */}
        <Button className={classes.start} disableElevation>
          <span className={classes.plus}>+</span>
          Start a room
        </Button>
        {/* Search */}
        <div className={classes.grow}>
          <IconButton aria-label="Inbox">
            <Search/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );

}
export default NavigationBar;