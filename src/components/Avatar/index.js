import React from "react";
import MaterialAvatar from "@material-ui/core/Avatar";
import { Typography, Badge } from "@material-ui/core";
import { MicOffOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

const Avatar = ({ image, title, nav, muted, style }) => {
    const classes = useStyles(style);
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
                    src={image ? image : 'https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg'} 
                    imgProps={imgProps}
                />
            ):(
              <img 
                    alt={title ? title : 'Avatar'}  
                    src={image ? image : 'https://v4--material-ui-docs.netlify.app/static/images/avatar/1.jpg'}
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

export default Avatar;
