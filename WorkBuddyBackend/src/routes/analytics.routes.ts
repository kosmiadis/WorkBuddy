import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { catchAsync } from "../middleware/catchAsync";
import analyticsController from "../controllers/analytics.controller";

const AnalyticsRoutes = Router();


AnalyticsRoutes.get('/monthly-general-report', checkAuth, catchAsync(analyticsController.getMonthlyGeneralReport))
AnalyticsRoutes.get('/overall-report', checkAuth, catchAsync(analyticsController.getOverallAnalytics))

export default AnalyticsRoutes;