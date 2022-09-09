import { Axios } from "../axios";

export const chatListAction = async(dispatch, email) => {
    try {
        const { data } = await Axios.post("/chat/chatList", email);
        dispatch({ type: "CHATLIST", payload: data });
    } catch (error) {
        dispatch({ type: "CHATLIST", payload: error });
    }
};

export const msgListAction = async(dispatch, list) => {
    try {
        const { data } = await Axios.post("/chat/msgList", list);
        dispatch({ type: "MSGLIST", payload: data });
    } catch (error) {
        dispatch({ type: "MSGLIST", payload: error });
    }
};

export const sendAction = async(dispatch, msg) => {
    try {
        const { data } = await Axios.post("/chat/send", msg);
        dispatch({ type: "MSGLIST", payload: data });
    } catch (error) {
        dispatch({ type: "MSGLIST", payload: error });
    }
};