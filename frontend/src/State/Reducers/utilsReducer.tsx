import { io } from "socket.io-client";

interface UtilsData {
  socket: any;
}

export const initialState: UtilsData = {
  socket: io('http://10.4.11.1:5001')
};

export const utilsReducer = (state: UtilsData = initialState, action: { type: any; }) => {
    switch (action.type) {
        default:
        return state;
    }
};
