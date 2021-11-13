import React from "react";
import socketio from "socket.io-client";
import _ from "../../server/config.json";

export const socket = socketio.connect(`wss://localhost:${_.server.port}`);
export const SocketContext = React.createContext(socket);