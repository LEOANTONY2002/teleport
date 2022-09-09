const messageReducer = (
    msg = {
        messageList: [],
        curUser: [],
    },
    action
) => {
    switch (action.type) {
        case "MSGLIST":
            return {...msg, messageList: action.payload };

        case "MSGLIST_ADD":
            const mes = msg.messageList.push(action.payload);
            return {...msg, messageList: mes };

        case "CURUSER":
            return {...msg, curUser: action.payload };

        default:
            return msg;
    }
};

export default messageReducer;