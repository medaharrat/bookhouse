import React from "react";
import PropTypes from 'prop-types';
import {
    Card, CardContent, CardMedia, Typography
} from '@material-ui/core';
import { useStyles } from "./styles";

const Category = ({ category }) => {
    const classes = useStyles();

    return (
      <Card className={classes.category} variant="outlined">
        <CardMedia
          className={classes.cover}
          image={ category.img }
          title={ category.title }
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" className={classes.title}>
              { category.title }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
              +100
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

Category.defaultProps = {
  
};

export default Category;