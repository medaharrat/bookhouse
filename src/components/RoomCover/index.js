import React from "react";
import PropTypes from 'prop-types';
import {
    Card, CardActions, CardContent , Typography, Button
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from "./styles";

const RoomCover = ({ title, category, numPeople, ...props }) => {
    const classes = useStyles(props);

    return (
        <Card className={classes.cover}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    { category }
                </Typography>
                <Typography variant="h5" component="h2">
                    { title }
                </Typography>
                <div>
                    { /* Avatars */}
                </div>
            </CardContent>
            <CardActions>
                <div className={classes.attendees}>
                    <PersonIcon />
                    <span> {numPeople} </span>
                </div>
            </CardActions>
        </Card>
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