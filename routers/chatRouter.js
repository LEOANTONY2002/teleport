const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

router.post("/chatList", async(req, res) => {
    const q = req.body;

    const list = await Chat.aggregate([{
            $match: {
                $or: [{ from: ObjectId(q.from) }, { to: ObjectId(q.from) }],
                // $nor: [{ from: q.from, to: q.from }],
            },
        },
        {
            $group: {
                _id: "$from",
                data: {
                    $last: { from: "$from" },
                    $last: { to: "$to" },
                },
                from: { $last: "$from" },
                to: { $last: "$to" },
                msg: { $last: "$msg" },
                createdAt: { $last: "$createdAt" },
            },
        },
        {
            $sort: {
                createdAt: 1,
            },
        },
    ]);

    const lst = await Chat.populate(list, { path: "from to" });

    // const lis = await Chat.find({
    //         $or: [{ from: q.from }, { to: q.from }],
    //     })
    //     .sort({
    //         createdAt: 1,
    //     })
    //     .populate("from to");

    try {
        res.send(lst);
    } catch (error) {
        res.send([]);
    }
});

router.post("/findUser", async(req, res) => {
    const q = req.body;

    const user = await User.findOne({ email: q.email });

    console.log(user);

    try {
        if (user) res.send({ error: false, user: user });
        else res.send({ error: true });
    } catch (error) {}
});

router.post("/msgList", async(req, res) => {
    const q = req.body;

    const list = await Chat.find({
        $or: [
            { from: q.from, to: q.to },
            { from: q.to, to: q.from },
        ],
    }).sort({
        createdAt: 1,
    });

    try {
        res.send(list);
    } catch (error) {
        res.send([]);
    }
});

router.post("/send", async(req, res) => {
    const q = req.body;

    const newMsg = new Chat({
        from: q.from,
        to: q.to,
        msg: q.msg,
        photo: q.photo,
    });

    try {
        const sendMsg = await newMsg.save();
        const list = await Chat.find({
            $or: [
                { from: q.from, to: q.to },
                { from: q.to, to: q.from },
            ],
        }).sort({
            createdAt: 1,
        });
        res.send(list);
    } catch (error) {
        console.log(error);
        res.send([]);
    }
});

module.exports = router;