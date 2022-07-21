import { io } from "socket.io-client";

interface UtilsData {
  socket: any;
}

export const initialState: UtilsData = {
  socket: io('http://10.4.1.7:5000')
};

export const utilsReducer = (state: UtilsData = initialState, action: { type: any; }) => {
    switch (action.type) {
        default:
        return state;
    }
};
