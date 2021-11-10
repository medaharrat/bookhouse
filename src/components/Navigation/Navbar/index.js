import React from 'react';
import {
  AppBar, Toolbar, IconButton
} from '@material-ui/core';
import {
  Home, Search, Apps
} from '@material-ui/icons';
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
        {pages.map((page) => (
          <div className={classes.grow} key={page.title}>
            <IconButton aria-label={page.title}>
              { page.icon }
            </IconButton>
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;