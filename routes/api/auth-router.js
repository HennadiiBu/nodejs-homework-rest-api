import express from "express";

import authController from "../../controllers/auth-controller.js";

import validateBody from "../../decorators/validateBode.js";

import { userSignupSchema, userSigninSchema } from "../../models/user.js";
import authenticate from "../../middlewares/authenticate.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
