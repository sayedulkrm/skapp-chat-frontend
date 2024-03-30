import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Home from "./components/Pages/Home/Home";
import Title from "./components/Shared/Title";

// React tostify components
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLoader from "./components/Layout/Loader/GlobalLoader";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";

const Chat = lazy(() => import("./components/Pages/Chat/Chat"));
const ChatHome = lazy(() => import("./components/Pages/ChatHome/ChatHome"));
const Groups = lazy(() => import("./components/Pages/Groups/Groups"));

// Admin

const AdminLogin = lazy(() => import("./components/Pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/Pages/Admin/Dashboard"));
const AdminUserManagement = lazy(
    () => import("./components/Pages/Admin/UserManagement")
);
const AdminChatManagement = lazy(
    () => import("./components/Pages/Admin/ChatManagment")
);
const AdminMessageManagement = lazy(
    () => import("./components/Pages/Admin/MessageManagement")
);

const App = () => {
    const initialTheme = localStorage.getItem("theme") || "light";

    // const { user } = useSelector((state: RootState) => state.auth);

    // console.log("Heyyyy am the userrr =======", user);

    const isAdminThere = true;

    useEffect(() => {
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", initialTheme);
    }, []);

    return (
        <>
            <Title />

            <div className="h-full w-full relative  dark:text-[#fff] text-[#000] bg-white dark:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black">
                <Suspense fallback={<GlobalLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/verify" element={<Verification />} />

                        {/* ============================================= */}

                        <Route path="/chat" element={<ChatHome />} />
                        <Route path="/chat/:chatId" element={<Chat />} />
                        <Route path="/groups" element={<Groups />} />

                        {/* Admin */}

                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoutes
                                    isAdmin={isAdminThere}
                                    isAdminRoutes={true}
                                    isAuthenticatedRoutes={true} // Set the value of isAuthenticatedRoutes explicitly
                                >
                                    <AdminLogin />
                                </ProtectedRoutes>
                            }
                        />
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoutes
                                    isAdmin={isAdminThere}
                                    isAdminRoutes={true}
                                    isAuthenticatedRoutes={true} // Set the value of isAuthenticatedRoutes explicitly
                                >
                                    <AdminDashboard />
                                </ProtectedRoutes>
                            }
                        />

                        <Route
                            path="/admin/user"
                            element={
                                <ProtectedRoutes
                                    isAdmin={isAdminThere}
                                    isAdminRoutes={true}
                                    isAuthenticatedRoutes={true} // Set the value of isAuthenticatedRoutes explicitly
                                >
                                    <AdminUserManagement />
                                </ProtectedRoutes>
                            }
                        />

                        <Route
                            path="/admin/chats"
                            element={
                                <ProtectedRoutes
                                    isAdmin={isAdminThere}
                                    isAdminRoutes={true}
                                    isAuthenticatedRoutes={true} // Set the value of isAuthenticatedRoutes explicitly
                                >
                                    <AdminChatManagement />
                                </ProtectedRoutes>
                            }
                        />

                        <Route
                            path="/admin/message"
                            element={
                                <ProtectedRoutes
                                    isAdmin={isAdminThere}
                                    isAdminRoutes={true}
                                    isAuthenticatedRoutes={true} // Set the value of isAuthenticatedRoutes explicitly
                                >
                                    <AdminMessageManagement />
                                </ProtectedRoutes>
                            }
                        />
                    </Routes>
                </Suspense>

                <ToastContainer />
            </div>
        </>
    );
};

export default App;
