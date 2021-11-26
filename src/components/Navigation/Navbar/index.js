import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Button, Modal, 
  Card, CardActions, CardContent, Typography,
  Grid, FormControl, TextField, Select, InputLabel, MenuItem
} from '@material-ui/core';
import {
  Search, Apps
} from '@material-ui/icons';
import { useStyles } from './styles';
import { createRoom, useRoomDispatch } from "../../../context";

const NavigationBar = () => { 
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: '',
    book: {},
    attendees: []
  });

  const books = [
    {id: 1, title: "The Hobbit", author: "JRR. Tolklien", cover: "./img/book_1.jfif"},
    {id: 2, title: "Futurama", author: "Michael Douglas JR.", cover: "./img/book_2.jfif"},
    {id: 3, title: "Relatively Famous", author: "Jessica Park", cover: "./img/book_3.jfif"},
    {id: 4, title: "Heal Your Mind Rewire Your Brain", author: "Patt-Lind Kyle", cover: "./img/book_4.jfif"},
    {id: 5, title: "It's about damn time", author: "Arlan Hamilton", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
    {id: 6, title: "Game of Thrones", author: "Author", cover: "./img/got_cover.jfif"},
    {id: 7, title: "Ce que le jour doit à la nuit", author: "Author", cover: "./img/book_5.jfif"},
    {id: 8, title: "From Zero to One", author: "Author", cover: "./img/zero_one_cover.jfif"}
  ];

  const dispatch = useRoomDispatch();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createRoom(dispatch, values);
  }

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
                      <InputLabel id="book">Book</InputLabel>
                      <Select
                        labelId="book"
                        id="book-select"
                        value={values.book}
                        onChange={handleChange('book')} 
                      >
                        {/* Fix this later */}
                        {books.map((book) => (
                          <MenuItem value={values.book}>{ book.title }</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                 </Grid>
              </CardContent>
              <CardActions className={classes.modalActions}>
                <Button variant="outlined" disableElevation disableRipple onClick={handleCreate}>
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