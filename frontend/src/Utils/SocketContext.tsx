import React from 'react'
import io, { Socket } from "socket.io-client";

export const socket:Socket = io('http://localhost:5000');
export const SocketContext: React.Context<any>  = React.createContext(undefined);