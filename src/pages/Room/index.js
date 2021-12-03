import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { 
    IconButton, Typography, Box, Grid, Button, Modal, Card, CardActions, CardContent
} from "@material-ui/core";
import {
    MicOff, VolumeOff, Mic, VolumeUp
} from "@material-ui/icons";
import Avatar from "../../components/Avatar";
import Layout from "../../components/Layout";
import { 
    getRoom, useRoomDispatch, useRoomState, 
    useAuthState, SocketContext, socket 
} from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "./styles.js";
import _ from "../../server/config.json";

const Room = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Get current user
    const { user } = useAuthState();

    // Get current room
    const { room, error } = useRoomState();
    const roomDispatch = useRoomDispatch();
    
    const TITLE = room && room.book.title;
    const AUTHOR = room && room.book.author;
    const SEP = room ? 'by' : '';

    // Read config and prepare states
    const config = _.socket
    const [modal, openModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [userStatus, setUserStatus] = useState({
        name: user.firstname,
        avatar: user.avatar,            
        muted: config.stateDefault.muted,
        deafened: config.stateDefault.deafened,
        connected: config.stateDefault.connected,            
    })

    const avatarStyle = { height: 70, width: 70 }

    const initializeMedia = () => {
        // Initialize Media
        const mediaContraints = { audio: true, video: false }
    
        navigator.mediaDevices.getUserMedia(mediaContraints).then((stream) => {
            let mediaRecorder = new MediaRecorder(stream)
            let audioChunks = []
            let audioBlob = null
    
            //On MediaRecorder data available
            mediaRecorder.addEventListener("dataavailable", (event) => {
                //Queue up data
                audioChunks.push(event.data)
            })
    
            //On MediaRecorder stop
            mediaRecorder.addEventListener("stop", () => {
                //Convert queue to blob
                audioBlob = new Blob(audioChunks)
    
                //Clear queue
                audioChunks = []
    
                //Convert blob to base64
                let fileReader = new FileReader()
                fileReader.readAsDataURL(audioBlob)
                fileReader.onloadend = () => {
                    //Guard: do not send if not ready
                    if (!userStatus.connected || userStatus.muted) return
                    else {
                        //Transmit data
                        socket.emit(config.messages.transmit, fileReader.result)
                        console.log("🎤 Emitting voice data ...")
                    }

                }
    
                //Start recording again
                mediaRecorder.start()
    
                setTimeout(() => {
                    mediaRecorder.stop()
                }, config.chunkTime)
            })
    
            //Start the media recorder cycle
            mediaRecorder.start()
            setTimeout(() => {
                mediaRecorder.stop()
            }, config.chunkTime)
        })

        //On voice transmission received
        socket.on(config.messages.transmit, (data) => {
            let audio = new Audio(data)
            audio.play()
        })
    
        //On user sync received
        socket.on(config.messages.sync, (data) => {
            console.log('> Syncing ...')
        })
    
        //On user status change
        socket.on(config.messages.update, (data) => {
            console.log('> User data changed', data)
            const list = []
            for (let id in data) {
                const info = data[id]
                if (info.connected == true){
                    list.push(info)
                }
            }

            setUsers(list)
        })
    
        //On socket connect
        socket.on('connect', () => {
            console.log('✔️ Connected to the server.')
        })
    
        //On socket disconnect
        socket.on('disconnect', () => {
            console.log('❌ Connection lost.')
        })

        openModal(true)
    }
    // Helpers
    const emitUserChange = () => {
        socket.emit(config.messages.update, userStatus)
    }

    // Events
    const leave = (e) => {
        e.preventDefault()
        // Disconnect user
        userStatus.connected = false
        emitUserChange()
        // Redirect to home
        navigate('/home');
    }

    const onUserConnect = (e) => {
        userStatus.connected = true
        emitUserChange()
        openModal(false)
    }

    const onToggleMuted = (e) => {
        userStatus.muted = !userStatus.muted
        emitUserChange()
    }
    
    const onToggleDeafened = (e) => {
        userStatus.deafened = !userStatus.deafened
        emitUserChange()
    }
    
    const handleClose = () => {
        openModal(false)
    }
    
    useEffect(() => {
        initializeMedia();
        getRoom(id, roomDispatch);
        // eslint-disable-next-line
    }, []);

    return (
        <Layout title={error ? '404 Not found': 'Bookhouse'}>
        {error ? <center><b>The room which you are trying to access does not exist anymore!</b></center>: (
        <SocketContext.Provider value={socket}>
            <Box className={classes.room}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                    <Typography className={classes.title} variant="h6" noWrap>
                        { `${TITLE} ${SEP} ${AUTHOR}` }
                        </Typography>
                    </Grid>
                        {/* Attendees */}
                        { // Only show attendees if the user is connected
                            userStatus.connected && (
                            <Grid item>
                                <Grid container spacing={1} className={classes.attendees}>
                                {users.map((user) => (
                                    <Grid item xs={3} key={users.indexOf(user)}>
                                        <Avatar 
                                            image={user.avatar}
                                            title={user.name ? user.name : 'Guest'} 
                                            muted={user.muted} style={avatarStyle}
                                            speaking={user.connected && !user.muted}
                                        />
                                    </Grid>
                                ))}
                                </Grid>
                            </Grid>
                            )
                        }
                    {/* Controls */}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        className={classes.controls}
                    >
                        {/* Disconnect */}
                        <Button id="control-connect" disableRipple className={classes.leave} onClick={leave}>
                            Leave quickly
                        </Button>
                        {/* Mute */}
                        <IconButton id="control-mute" disableRipple className={classes.controlBtn} onClick={onToggleMuted}>
                            { userStatus.muted ? (<MicOff className={classes.controllOff}/>) : (<Mic/>) }
                        </IconButton >
                        {/* Deafen */}
                        <IconButton id="control-deafen" disableRipple className={classes.controlBtn} onClick={onToggleDeafened}>
                            { userStatus.deafened ? (<VolumeOff className={classes.controllOff}/>) : (<VolumeUp/>) }
                        </IconButton >
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={modal}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                      handleClose();
                    }
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card className={classes.modal} variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            You're about to connect to a room
                        </Typography>
                        <div>
                            {/* Mute */}
                            <IconButton 
                                id="control-mute" 
                                disableRipple 
                                className={classes.modalController} 
                                onClick={onToggleMuted}
                            >
                                { userStatus.muted ? (<MicOff className={classes.controllOff}/>) : (<Mic/>) }
                            </IconButton >
                            {/* Deafen */}
                            <IconButton 
                                id="control-deafen" 
                                disableRipple 
                                className={classes.modalController} 
                                onClick={onToggleDeafened}
                            >
                                { userStatus.deafened ? (<VolumeOff className={classes.controllOff}/>) : (<VolumeUp/>) }
                            </IconButton >
                        </div>
                    </CardContent>
                    <CardActions className={classes.modalActions}>
                        <Button variant="outlined" disableElevation disableRipple onClick={onUserConnect}>
                            Continue
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </SocketContext.Provider>
        )}
        </Layout>
    );
}

Room.propTypes = {
    title: PropTypes.string.isRequired,
};
  
Room.defaultProps = {
    
};

export default Room;