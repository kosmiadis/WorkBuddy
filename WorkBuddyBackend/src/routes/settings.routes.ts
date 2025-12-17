import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { catchAsync } from "../middleware/catchAsync";
import settingsController from "../controllers/settings.controller";
import { validateBody } from "../middleware/validateBody";
import { addHourlyRateSchema } from "../dataValidation/settings";

const SettingsRoutes = Router();

SettingsRoutes.post('/hourly-rate', checkAuth, validateBody(addHourlyRateSchema), catchAsync(settingsController.setHourlyRate));

export default SettingsRoutes;