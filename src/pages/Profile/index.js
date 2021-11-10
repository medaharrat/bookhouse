import React, { useContext } from "react";
import {
    Typography, Button, Grid
} from "@material-ui/core";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import ProfileTabs from "../../components/ProfileTabs";
import clsx from "clsx";
import { GlobalContext } from "../../context/GlobalState";
import { useStyles } from "./styles";

const Profile = () => {
    const classes = useStyles();
    const { user } = useContext(GlobalContext);

    const avatarStyle = {  height: 150, width: 150 }

    return (
        <Layout>
            <Grid container>
                <Grid container lg={12} direction="column" justifyContent="space-between" alignItems="center">
                    <Grid item lg={9} className={classes.user}>
                        <Avatar style={avatarStyle}/>
                        <Typography variant="h5" className={clsx(classes.padding, classes.name)}>
                            { `${user.first_name} ${user.last_name}`}
                        </Typography>
                    </Grid>
                    <Grid item lg={3}>
                        <Button 
                            className={classes.btn} 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            disableRipple
                            disableElevation
                        >
                            Edit profile
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.tabs}>
                    <ProfileTabs />
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Profile;