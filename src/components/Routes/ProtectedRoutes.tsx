import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Outlet, redirect } from "react-router-dom";

interface IProtectedRoutes {
    // isAdmin?: boolean;
    isAdminRoutes?: boolean;
    children: any;
    isAuthenticatedRoutes?: boolean;
    sendToRoutes?: string;
}
const ProtectedRoutes: React.FC<IProtectedRoutes> = ({
    children,
    isAuthenticatedRoutes,
    sendToRoutes,
}) => {
    const { isAuthLoading, user } = useSelector(
        (state: RootState) => state.auth
    );

    if (isAuthLoading || user === undefined) {
        return <div>Loading...</div>;
    }

    if (isAuthenticatedRoutes && !user) {
        return redirect(sendToRoutes ?? "/login");
    }

    if (!isAuthenticatedRoutes && user) {
        return redirect(sendToRoutes ?? "/profile");
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoutes;
