import React from "react";
import PropTypes from 'prop-types';
import {
    Grid, Typography
} from '@material-ui/core';
import { useStyles } from "./styles";

const BookCover = ({title, subtitle, cover}) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item>
                <img 
                    className={classes.cover} 
                    alt={title ? title : ''}
                    src={cover} 
                />
            </Grid>
            {
                (title.length > 0) && (
                    <>
                        <Typography variant="body2" className={classes.title}>
                            { title && title.length <= 16 ? title : `${title.substr(0, 15)} ...` }
                        </Typography>
                        <Typography variant="body2" className={classes.subtitle}>
                            { subtitle && subtitle.length <= 16 ? subtitle : `${subtitle.substr(0, 14)} ...` }
                        </Typography>
                    </>
                )
            }

        </Grid>
    );
}

BookCover.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired, 
    cover: PropTypes.string.isRequired
};
  
BookCover.defaultProps = {
    
};

export default BookCover;