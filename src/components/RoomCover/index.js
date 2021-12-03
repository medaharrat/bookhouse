import React from "react";
import PropTypes from 'prop-types';
import {
    Grid, Card, CardActions, CardContent , Typography, Button
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

const RoomCover = ({ id, title, book, numPeople }) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Card className={classes.cover} variant="outlined">
                <div className={classes.colorTag} />
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                { book && book.length <= 25 ? book : `${book.substr(0, 24)} ...` }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                { title && title.length <= 14 ? title : `${title.substr(0, 13)} ...` }
                            </Typography>
                        </Grid>
                        <Grid container alignItems="center">
                            <PersonIcon color="disabled" fontSize="small"/>
                            <Typography variant="body2" color="textSecondary"> 
                                { numPeople && +numPeople <= 10 ? numPeople : `10+` }
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <Button 
                        variant="outlined"
                        disableRipple
                        disableElevation
                        className={classes.jumpInBtn}
                        component={Link} to={`/r/${id}`}
                    >
                        Jump in
                    </Button>
                </CardActions>
            </Card>
            <div className={classes.divider} />
        </Grid>
    )
}

RoomCover.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    numPeople: PropTypes.number,
    cover: PropTypes.string
};
  
RoomCover.defaultProps = {
    category: '',
    numPeople: 0,
    cover: '',
};

export default RoomCover;