import userReducer from "./userReducer";
import messageReducer from "./messageReducer";
import { combineReducers } from "redux";
import chatReducer from "./chatReducer";

const reducers = combineReducers({
    user: userReducer,
    msg: messageReducer,
    chatList: chatReducer,
});

export default reducers;