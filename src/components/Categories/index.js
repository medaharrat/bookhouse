import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Category from "./Category";

const Categories = ({ categories }) => {

    return (
        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
            {categories.map((category) => (
                <Grid item key={category.title}>
                    <Category category={category} />
                </Grid>
            ))}
        </Grid>
    );
}

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
};
  
Categories.defaultProps = {
    
};

export default Categories;