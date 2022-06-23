import React from 'react'
import io, { Socket } from "socket.io-client";

export const socket:Socket = io('http://10.3.4.5:5001');
export const SocketContext: React.Context<any>  = React.createContext(undefined);