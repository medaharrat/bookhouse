import React from 'react';
import { Home, Search, Apps } from '@material-ui/icons';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const NavigationBar = () => { 
    const pathname = window.location.pathname;
    const [value, setValue] = React.useState(pathname);
    const classes = useStyles();
  return (
      <BottomNavigation className={classes.navBar}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }
        }
      >
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/h" value="/h" />
        <BottomNavigationAction label="Search" icon={<Search />} component={Link} to="/" value="/" />
        <BottomNavigationAction label="Library" icon={<Apps />} component={Link} to="/login" value="/login" />
      </BottomNavigation>

  );
};

export default NavigationBar;