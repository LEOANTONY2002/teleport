const User = require("../models/User");
const express = require("express");

const router = express.Router();

router.post("/signup", async(req, res) => {
    const q = req.body;
    const user = new User({
        name: q.name,
        email: q.email,
        password: q.password,
        photo: q.photo,
    });

    const existUser = await User.findOne({ email: q.email });
    console.log(existUser);
    if (existUser) res.send({ error: true, msg: "Email already exists" });
    else {
        try {
            const newUser = await user.save();
            console.log(newUser);
            res.send({
                error: false,
                user: newUser,
            });
        } catch (error) {
            console.log(error);
        }
    }
});

router.post("/login", async(req, res) => {
    const q = req.body;

    try {
        const user = await User.findOne({ email: q.email });
        if (user.password == q.password) res.send({ error: false, user });
        else res.send({ error: true, msg: "Invalid Password" });
    } catch (error) {
        res.send({ error: true, msg: "Invalid Email" });
    }
});

router.get("/userList", async(req, res) => {
    const q = req.body;

    const list = await User.find();
});

module.exports = router;