import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { catchAsync } from "../middleware/catchAsync";
import worksessionController from "../controllers/worksession.controller";
import { endpoints } from "../config/endpoints";
import { validateBody } from "../middleware/validateBody";
import { createWorkSessionSchema, editWorkSessionSchema } from "../dataValidation/workSession";
const WorkSessionRoutes = Router()

WorkSessionRoutes.get(endpoints.worksessions.getWorkSessions.getEndpoint(), checkAuth, catchAsync(worksessionController.getWorkSessions));
WorkSessionRoutes.post(endpoints.worksessions.createWorkSession.getEndpoint(), checkAuth, validateBody(createWorkSessionSchema), catchAsync(worksessionController.createWorkSession))
WorkSessionRoutes.put(endpoints.worksessions.editWorkSession.getEndpoint(), checkAuth, validateBody(editWorkSessionSchema), catchAsync(worksessionController.editWorkSession))
WorkSessionRoutes.delete(endpoints.worksessions.deleteWorkSession.getEndpoint(), checkAuth, catchAsync(worksessionController.deleteWorkSession))

WorkSessionRoutes.get(endpoints.worksessions.getNextWorkSession.getEndpoint(), checkAuth, catchAsync(worksessionController.getNextWorkSession));

//Work shift related routes (check in check out)

WorkSessionRoutes.post(endpoints.worksessions.checkIn.getEndpoint(), checkAuth, catchAsync(worksessionController.checkInWorkSession))
WorkSessionRoutes.post(endpoints.worksessions.checkOut.getEndpoint(), checkAuth, catchAsync(worksessionController.checkOutWorkSession))

export default WorkSessionRoutes;