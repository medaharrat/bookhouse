import React, { useContext } from "react";
import {
    Typography, Button, Grid
} from "@material-ui/core";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import ProfileTabs from "../../components/ProfileTabs";
import clsx from "clsx";
import { useStyles } from "./styles";

const Profile = () => {
    const classes = useStyles();
    const user = {
        id: "1",
        profile_image: "https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg",
        first_name: "Mohamed",
        last_name: "Aharrat",
        email: "ahr9oi@inf.elte.hu",
        loggedIn: true,
    }

    const avatarStyle = {  height: 150, width: 150 }

    return (
        <Layout>
            <div className={classes.profile}>
                <Grid container lg={12} direction="column" justifyContent="space-between" alignItems="center">
                    <Grid item lg={9} className={classes.user}>
                        <Avatar style={avatarStyle}/>
                        <Typography variant="h5" className={clsx(classes.padding, classes.name)}>
                            { `${user.first_name} ${user.last_name}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            { `@${user.first_name}`}
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