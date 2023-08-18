import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required: [true, , "Enter your email address"],
    },
    username:{
        type: String,
        unique: true,
        required: [true, , "Enter your username"],
    },
    password:{
        type: String,
        required: [true, "Enter your password"],
    }
}, { timestamps: true });

UserSchema.pre("save", async function () {

    this.password = await bcrypt.hash(this.password, 12);
})

const User = mongoose.model("user", UserSchema);

export default User