import React from "react";
import {
    Typography, Grid
} from "@material-ui/core";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import ProfileTabs from "../../components/ProfileTabs";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useAuthState } from "../../context";

const Profile = () => {
    const classes = useStyles();
    const { user } = useAuthState()
    const avatarStyle = {  height: 150, width: 150 }

    return (
        <Layout>
            <div className={classes.profile}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center">
                    <Grid item lg={9} className={classes.user}>
                        <Avatar image={user.avatar} style={avatarStyle}/>
                        <Typography variant="h5" className={clsx(classes.padding, classes.name)}>
                            { `${user.firstname} ${user.lastname}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            { `@${user.username}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.tabs}>
                    <ProfileTabs />
                </Grid>
            </div>
        </Layout>
    );
}

export default Profile;