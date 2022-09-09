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