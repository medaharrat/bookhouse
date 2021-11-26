import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Button, Modal, 
  Card, CardActions, CardContent, Typography,
  Grid, FormControl, TextField
} from '@material-ui/core';
import {
  Search, Apps
} from '@material-ui/icons';
import { useStyles } from './styles';

const NavigationBar = () => { 
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: '',
    book: '',
    attendees: 0
  });

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
        <div className={classes.start}>
          <Button disableElevation onClick={toggleModal}>
            <span className={classes.plus}>+</span>
            Start a room
          </Button>

          <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="create-new-room"
          >
            <Card className={classes.modal} variant="outlined">
              <CardContent>
                <Grid
                  container
                  spacing={2} 
                  className={classes.form}
                >
                  <Grid item lg={12}>
                    <Typography variant="h5" className={classes.title}>
                        Create a room
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <TextField 
                        id="title" label="Title" 
                        variant="outlined" onChange={handleChange('title')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <TextField 
                        id="book" label="Book" 
                        variant="outlined" onChange={handleChange('book')}
                      />
                    </FormControl>
                  </Grid>
                 </Grid>
              </CardContent>
              <CardActions className={classes.modalActions}>
                <Button variant="outlined" disableElevation disableRipple>
                  Create
                </Button>
              </CardActions>
            </Card>
          </Modal>
        </div>
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