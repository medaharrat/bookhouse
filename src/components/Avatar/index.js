import React from "react";
import PropTypes from 'prop-types';
import { Avatar as MaterialAvatar, Typography, Badge } from "@material-ui/core";
import { MicOffOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

const Avatar = ({ image, title, nav, muted, ...props }) => {
    const classes = useStyles(props);
    const imgProps = { draggable: "false" }

    return (
        <div className={classes.avatarContainer}>
            <Badge
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className={classes.muted}
                badgeContent={muted && (<MicOffOutlined className={classes.mutedIcon}/>)}
                invisible={!muted}
            >
            {nav ? (
                <MaterialAvatar 
                    alt={title ? title : 'Avatar'} 
                    src={image} 
                    imgProps={imgProps}
                />
            ):(
              <img 
                    alt={title ? title : 'Avatar'}  
                    src={image}
                    className={classes.avatar}
                    draggable="false"
                />
            )}
            </Badge>
            {title && (
                <Typography className={classes.title} variant="body1">
                    { title }
                </Typography>
            )}
        </div>
    )
}

Avatar.propTypes = {
    image: PropTypes.string, 
    title: PropTypes.string, 
    nav: PropTypes.bool, 
    muted: PropTypes.bool, 
    style: PropTypes.object
};
  
Avatar.defaultProps = {
    image: 'https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg', 
    title: '', 
    nav: false, 
    muted: false, 
    style: {}
};

export default Avatar;
