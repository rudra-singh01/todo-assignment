import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET , { expiresIn: "6d" });
        res.cookie("token", token);
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
        res.status(201).json({ message: "User created successfully" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await userModel.findOne({ email: email });
    if(!user){
        return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: "6d" });
    res.cookie("token", token , { httpOnly: true });
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
    });
}
export const userLogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "User authenticated",
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}