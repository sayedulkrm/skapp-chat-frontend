import { lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "./components/Auth/Verification";
import Home from "./components/Pages/Home/Home";
import Navbar from "./components/Layout/Navbar/Navbar";
import Title from "./components/Shared/Title";

const Chat = lazy(() => import("./components/Pages/Chat/Chat"));
const Groups = lazy(() => import("./components/Pages/Groups/Groups"));

const App = () => {
    const initialTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    console.log(setTheme);

    return (
        <>
            <Title />

            <div className="h-full w-full relative  dark:text-[#fff] text-[#000] bg-white dark:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black">
                <Navbar />

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

                <ToastContainer />
            </div>
        </>
    );
};

export default App;
