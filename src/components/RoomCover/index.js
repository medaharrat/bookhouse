import React from "react";
import PropTypes from 'prop-types';
import {
    Grid, Card, CardActions, CardContent , Typography, Button, Link
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import { useStyles } from "./styles";

const RoomCover = ({ title, category, numPeople, cover }) => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.cover} variant="outlined">
                <div className={classes.colorTag} />
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                { category && category.length <= 25 ? category : `${category.substr(0, 24)} ...` }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                { title && title.length <= 14 ? title : `${title.substr(0, 13)} ...` }
                            </Typography>
                        </Grid>
                        <Grid container xs={12} alignItems="center">
                            <PersonIcon color="disabled" fontSize="small"/>
                            <Typography variant="body2" color="textSecondary"> 
                                { numPeople && +numPeople <= 10 ? numPeople : `10+` }
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <Link href="/r" underline="none" className={classes.jumpIn}>
                        <Button 
                            variant="outlined"
                            disableRipple
                            disableElevation
                            className={classes.jumpInBtn}
                        >
                            Jump in
                        </Button>
                    </Link>
                </CardActions>
            </Card>
            <div className={classes.divider} />
        </div>
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