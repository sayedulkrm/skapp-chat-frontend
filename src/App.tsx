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

const Chat = lazy(() => import("./components/Pages/Chat/Chat") as any);
const Groups = lazy(() => import("./components/Pages/Groups/Groups"));

const App = () => {
    const initialTheme = localStorage.getItem("theme") || "light";

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

                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:chatId" element={<Chat />} />
                        <Route path="/groups" element={<Groups />} />
                    </Routes>
                </Suspense>

                <ToastContainer />
            </div>
        </>
    );
};

export default App;
