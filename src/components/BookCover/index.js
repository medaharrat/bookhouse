import React from "react";
import PropTypes from 'prop-types';
import {
    Typography
} from '@material-ui/core';
import { useStyles } from "./styles";

const BookCover = ({title, subtitle, cover}) => {
    const classes = useStyles();
    return (
        <div>
            <img 
                className={classes.cover} 
                alt={title ? title : ''}
                src={cover} 
            />
            {
                (title.length > 0) && (
                    <>
                        <Typography variant="body2" className={classes.title}>
                            { title.length <= 16 ? title : `${title.substr(0, 15)} ...` }
                        </Typography>
                        <Typography variant="body2" className={classes.subtitle}>
                            { subtitle.length <= 16 ? subtitle : `${subtitle.substr(0, 14)} ...` }
                        </Typography>
                    </>
                )
            }

        </div>
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