import React from "react";
import {
    Grid
} from "@material-ui/core";
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

export default Categories;