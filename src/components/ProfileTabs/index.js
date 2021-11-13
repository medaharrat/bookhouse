import React, { useState } from 'react';
import { 
  useAuthDispatch, logout, useAuthState 
} from '../../context';
import {
   Tabs, Tab, Paper
} from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import TabPanel from './TabPanel';
import { useStyles } from './styles';

const ProfileTabs = (props) => {
  
  const classes = useStyles();
  const [value, setValue] = useState(1);
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
  
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          aria-label="user profile"
          onChange={handleChange}
        >
          <Tab value={1} label="Reading list" disableRipple />
          <Tab value={2} label="Connections" disableRipple />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={1}>
        This is my reading list!
      </TabPanel>
      <TabPanel value={value} index={2}>
        These are my connections!
      </TabPanel>
    </div>
  );
}

export default ProfileTabs;