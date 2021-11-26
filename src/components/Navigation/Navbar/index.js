import React from 'react';
import {
  AppBar, Toolbar, IconButton, Button
} from '@material-ui/core';
import {
  Search, Apps
} from '@material-ui/icons';
import { useStyles } from './styles';

const NavigationBar = () => { 
  const classes = useStyles();

  return (
    <AppBar className={classes.navBar}>
      <Toolbar>
        {/* Apps */}
        <div className={classes.grow}>
          <IconButton aria-label="Inbox">
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