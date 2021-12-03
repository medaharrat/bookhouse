'using strict'

// Import modules
const Log = require('./log.node');


// Initialize module
function initialize(io, config) {
    const event = config.messages;
    const users = {};

    // On new connection established
    io.on("connection", (socket) => {
        //Setup connection
        const id = socket.id
        users[id] = {
            name: config.stateDefault.name,
            avatar: config.stateDefault.avatar,            
            muted: config.stateDefault.muted,
            deafened: config.stateDefault.deafened,
            connected: config.stateDefault.connected,            
        }
        Log.info("New connection:", id)

        //Send update with user info
        socket.emit(event.sync, users[id])

        //Send update of new login
        io.sockets.emit(event.update, users)
        
        //Event for voice receive
        socket.on(event.transmit, (stream) => {
            //Incoming: 
            //data:application/octet-stream;base64,...DATA...

            //Convert from octet stream to ogg stream
            const streamSlices = stream.split(";")
            const outStream = 'data:audio/ogg;' + streamSlices[1]

            //Only log on voice debug, very noisy
            //Log.info("Voice sent from:", id)
        
            //Send data to everyone
            for (const i in users) {
                //Guard: do not echo back
                if (i == id) continue

                //Send if client is ready
                if (!users[i].deafened && users[i].connected) {
                    socket.broadcast.to(i).emit(event.transmit, outStream)
                }
            }
        });
    
        //Event for state change
        socket.on(event.update, (data) => {
            //Update user         
            users[id] = data //TODO Securiy: escape incoming data!
    
            //Log update
            Log.info("User state update:", id)
            console.log(data)

            //Send data to everyone
            io.sockets.emit(event.update, users)
        });
    
        //Event for user disconnect
        socket.on('disconnect', () => {
            Log.info("Disconnected:", id)

            //Remove user from room
            delete users[id] //TODO save as inactive and wait for reconnect?

            //Broaccast change
            io.sockets.emit(event.update, users)
        }); 
    });
};

module.exports = initialize