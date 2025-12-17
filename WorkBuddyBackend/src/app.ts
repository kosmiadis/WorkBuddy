import express from 'express';
import http from 'http';

import cors from 'cors';
import helmet from 'helmet';

import cookieParser from 'cookie-parser';

import AuthRoutes from './routes/auth.routes';
import { ErrorHandler } from './errors/ErrorHandler';
import { config } from './config/config';
import WorkSessionRoutes from './routes/worksession.routes';
import AnalyticsRoutes from './routes/analytics.routes';
import SettingsRoutes from './routes/settings.routes';

const app = express();
export const httpServer = new http.Server(app);

app.use(cors({
    origin: config.ORIGIN,
    credentials: true,
}))
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', AuthRoutes);
app.use('/worksession',WorkSessionRoutes);
app.use('/analytics', AnalyticsRoutes);
app.use('/settings', SettingsRoutes);

app.use(ErrorHandler);

