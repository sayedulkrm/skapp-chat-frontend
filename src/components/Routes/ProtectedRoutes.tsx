import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";

interface IProtectedRoutes {
    isAdmin?: boolean;
    isAdminRoutes?: boolean;
    children: any;
    isAuthenticatedRoutes?: boolean;
    sendToRoutes?: string;
}
const ProtectedRoutes: React.FC<IProtectedRoutes> = ({
    children,
    isAuthenticatedRoutes,
    sendToRoutes,
    isAdmin,
    isAdminRoutes,
}) => {
    const { isAuthLoading, user } = useSelector(
        (state: RootState) => state.auth
    );

    if (isAuthLoading || user === undefined) {
        return <div>Loading...</div>;
    }

    if (isAuthenticatedRoutes && !user) {
        return <Navigate to={sendToRoutes ?? "/login"} />;
    }

    if (!isAuthenticatedRoutes && user) {
        return <Navigate to={sendToRoutes ?? "/asd"} />;
    }

    if (!isAdmin && isAdminRoutes) {
        return <Navigate to={sendToRoutes ?? "/chat"} />;
    }

    // if (isAdmin && isAdminRoutes) {
    //     return <Navigate to={sendToRoutes ?? "/admin/dashboard"} />;
    // }

    return children ? children : <Outlet />;
};

export default ProtectedRoutes;
