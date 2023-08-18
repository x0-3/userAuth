// server\Middlewares\AuthMiddleware.js
import User from "../models/User.js";
import dotenv from "dotenv";
import jws from "jsonwebtoken";


dotenv.config();

export const userVerification = (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }

    jws.verify(token, process.env.TOKEN_KEY, async (err, data) => {

        if (err) {

            return res.json({ status: false })
        } else {

            const user = await User.findById(data.id);
            if (user) {

                return res.json({ status: true, user: user.username});
            } else {
                
                return res.json({ status: false });
            }
        }
    })
};