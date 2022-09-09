const chatReducer = (chatList = [], action) => {
    switch (action.type) {
        case "CHATLIST":
            return { chatList: action.payload };

        default:
            return chatList;
    }
};

export default chatReducer;