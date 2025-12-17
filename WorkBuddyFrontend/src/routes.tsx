import { createBrowserRouter, Navigate } from "react-router-dom";
import CoreLayout from "./components/layouts/CoreLayout";
import Dashboard from "./components/pages/Dashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Settings from "./components/pages/Settings";
import WorkLog from "./components/pages/WorkLog";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import paths from "./config/paths";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import PageNotFound from "./components/Error/PageNotFound";

const router = createBrowserRouter([
    {path: '/', element: <ProtectedRoute><CoreLayout /></ProtectedRoute>, children: [
        { path:'', element: <DashboardLayout />, children: [
            {index: true, element: <Navigate to={'/'+paths.app.dashboard.getPath()}/>},
            {path: paths.app.dashboard.getPath(), element: <Dashboard />},
            {path: paths.app.worklog.getPath(), element: <WorkLog />},
            {path: paths.app.settings.getPath(), element: <Settings />},
            {path: '*', element: <PageNotFound />}
        ]},
    ]},
    {path: '/auth', element: <AuthLayout />, children: [
        { path: paths.auth.login.getPath(), element: <Login />},
        { path: paths.auth.register.getPath(), element: <Register />},
    ]}
])

export default router;
