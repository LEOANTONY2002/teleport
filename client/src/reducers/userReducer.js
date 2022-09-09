const userReducer = (user = [], action) => {
    switch (action.type) {
        case "SIGNUP":
            return { user: action.payload };

        case "LOGIN":
            return { user: action.payload };

        default:
            return user;
    }
};

export default userReducer;