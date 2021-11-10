import React from "react";
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
          image={ category.bg }
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

export default Category;