import User from "../models/User.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from 'bcrypt';

export const SignUp = async (req, res, next) => {

    try {
        
        const { email, username, password } = req.body;

        // check if the already exist in db
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        // create new user and token
        const user = await User.create({ email, username, password });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();

    } catch (error) {
        console.error(error);
    }
};

export const login = async (req, res, next) => {

    try {
        
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Incorrect password or email"});
        };

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect password or email"});
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(201).json({ message: "User logged in successfully", success: true })
        .next();

    } catch (error) {
        console.error(error);
    }
};