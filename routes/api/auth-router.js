import express from "express";

import authController from "../../controllers/auth-controller.js";

import validateBody from "../../decorators/validateBode.js";

import {
  userSignupSchema,
  userSigninSchema,
} from "../../utils/validations/contactValidationSchemas.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";
import { emailSchema } from "../../utils/validations/emailSchema.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const emailValidate = validateBody(emailSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

authRouter.post("/signin", userSigninValidate, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/users/avatars",
  upload.single("avatarURL"),
  authenticate,
  authController.changeAvatar
);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post("/verify", emailValidate, authController.resendVerifyEmail);

export default authRouter;
