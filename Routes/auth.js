const express = require("express");
const router = express.Router();
const { User } = require("../models/Schema")
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json({ user });
            } else {
                res.status(400).json({ msg: "Invalid Credentials" });
            }
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
    } catch (error) {
        res.json({ error: error }).status(500);
    }
})

module.exports = router;