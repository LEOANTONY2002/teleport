import { Axios } from "../axios";

export const signupAction = async(dispatch, user) => {
    try {
        const { data } = await Axios.post("/user/signup", user);
        dispatch({ type: "SIGNUP", payload: data });
    } catch (error) {
        dispatch({ type: "SIGNUP", payload: error });
    }
};

export const loginAction = async(dispatch, user) => {
    try {
        const { data } = await Axios.post("/user/login", user);
        dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
        dispatch({ type: "LOGIN", payload: error });
    }
};

export const socketAction = async(dispatch, io) => {
    try {
        dispatch({ type: "SOCKET", payload: io });
    } catch (error) {
        dispatch({ type: "SOCKET", payload: error });
    }
};