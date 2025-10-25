const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email })
    if (isUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hasedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        token,
    })
}

async function loginUser(req, res){
    
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({message: "Invalid Credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid Credentials"})
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        token,
    })
}

module.exports = { registerUser, loginUser }