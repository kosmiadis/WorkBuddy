import { Router } from "express";
import authController from '../controllers/auth.controller';
import { catchAsync } from '../middleware/catchAsync';
import { endpoints } from '../config/endpoints';
import { checkAuth } from "../middleware/checkAuth";
import { validateBody } from "../middleware/validateBody";
import { registerSchema, resetPasswordSchema } from "../dataValidation/authValidation";
const AuthRoutes = Router();

AuthRoutes.get(endpoints.auth.me.getEndpoint(), checkAuth, catchAsync(authController.me));
AuthRoutes.post(endpoints.auth.login.getEndpoint(), catchAsync(authController.login));
AuthRoutes.post(endpoints.auth.register.getEndpoint(), validateBody(registerSchema), catchAsync(authController.register));
AuthRoutes.post(endpoints.auth.logout.getEndpoint(), checkAuth, catchAsync(authController.logout));

AuthRoutes.post(endpoints.auth.resetPassword.getEndpoint(), checkAuth, validateBody(resetPasswordSchema), catchAsync(authController.resetPassword))

AuthRoutes.delete(endpoints.auth.delete.getEndpoint(), checkAuth, catchAsync(authController.deleteAccount));

export default AuthRoutes;
