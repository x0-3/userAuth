import express from "express";
import { SignUp, login } from "../controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const AuthRoute = express.Router();

AuthRoute.post("/SignUp", SignUp);
AuthRoute.post("/login", login);
AuthRoute.post("/", userVerification);

export default AuthRoute;
