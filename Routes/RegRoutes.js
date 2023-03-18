const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models/Schema")
const bcrypt = require("bcryptjs");


router.post("/", async (req, res) => {
    try {
        // const { name, email, password } = req.body;
        const user = new User(req.body)
        await user.save();
        res.json(user);
    } catch (error) {
        // console.log(error);
        res.json({ error: error }).status(500);
    }
})
router.put("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(user._id, { password: hashedPassword })
            res.json({ msg: "changed successfully" });
        } else {
            res.json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.json({ error: error }).status(500);
    }
})


module.exports = router;