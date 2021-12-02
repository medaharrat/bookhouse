import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Button, Modal, 
  Card, CardActions, CardContent, Typography,
  Grid, FormControl, TextField, Select, InputLabel, MenuItem
} from '@material-ui/core';
import {
  Search, Apps
} from '@material-ui/icons';
import { useStyles } from './styles';
import { createRoom, useRoomDispatch, getBooks, useBookDispatch, useBookState } from "../../../context";

const NavigationBar = () => { 
  const classes = useStyles();
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const { books, loading } = useBookState();
  const [values, setValues] = useState({
    title: '',
    book: '',
    attendees: []
  });

  const dispatch = useRoomDispatch();
  const bookDispatch = useBookDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Data validation
      if (values.title.length == 0 || values.book.length == 0) {
        setEmpty(true);
        return;
      }
      // Add new element
      let _id = values.book;
      values.book = books.filter((book) => book._id == _id)[0]
      await createRoom(dispatch, values);
      setOpen(false);
    } catch( error ) {
      console.log(`Insertion Error: ${error}`);
    }
  }

  useEffect(() => {
    // Run queries
    getBooks(bookDispatch);

    // eslint-disable-next-line
  }, []);

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
        <div className={classes.startWrapper}>
          <div className={classes.start}>
            <Button disableElevation onClick={toggleModal} className={classes.startBtn}>
              <span className={classes.plus}>+</span>
              Start a room
            </Button>
          </div>
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
                    <Typography variant="h5">
                        Create a room
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <TextField 
                        id="title" label="Title" 
                        variant="outlined" onChange={handleChange('title')}
                        required error={empty}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.input}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                      <InputLabel id="book">Book</InputLabel>
                      <Select
                        labelId="book"
                        id="book-select"
                        value={values.book}
                        onChange={handleChange('book')} 
                      >
                        {/* Fix this later */}
                        {books && books.map((book) => (
                          <MenuItem key={book._id} value={book._id}>{ book.title }</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                 </Grid>
              </CardContent>
              <CardActions className={classes.modalActions}>
                <Button 
                  variant="outlined" 
                  disableElevation 
                  disableRipple 
                  onClick={handleCreate}
                  disabled={loading}
                >
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