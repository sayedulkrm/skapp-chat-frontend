import { useEffect, useState } from "react";
import {
    FiSun,
    FiMoon,
    FiBell,
    FiUsers,
    FiSearch,
    FiLogOut,
} from "react-icons/fi";
// import { Link } from "react-router-dom";
import { IoMdPerson, IoMdPersonAdd, IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AuthNavbar = () => {
    const initialTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(initialTheme);

    const [profileButton, setProfileButton] = useState(false);
    const [notification, setNotification] = useState(false);

    const navigate = useNavigate();

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const openSearchModal = () => {
        console.log("Open search modal");
    };

    const navigateToGroup = () => {
        navigate("/groups");
    };

    const handleProfileButtonClick = () => {
        setProfileButton(!profileButton);
    };

    const openNotificationsBox = () => {
        setNotification(!notification);
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center h-[8vh] ">
            {/* Logo */}
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold mr-4">skapp</h1>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2 md:gap-5">
                {/* Notification button */}

                <div className="mr-4 relative">
                    <button
                        className=" flex items-center gap-1 border p-1 md:p-2 rounded-md"
                        onClick={openNotificationsBox}
                    >
                        <FiBell className="h-3 w-3 md:w-6 md:h-6" />
                    </button>
                    {notification && (
                        <div className="z-10  w-60 absolute top-14 right-0 bg-white rounded-md shadow">
                            <div className="w-full h-full flex justify-start items-center flex-col ">
                                <div className="hover:bg-gray-400 rounded-md duration-200 w-full flex items-center gap-2 text-black px-4 py-2">
                                    Profile
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Groups button */}
                <button
                    className="mr-4 flex items-center gap-1 border p-1 md:p-2 rounded-md"
                    onClick={navigateToGroup}
                >
                    <FiUsers className="h-3 w-3 md:w-6 md:h-6" />
                </button>

                {/* Search button */}
                <button
                    className="mr-4 flex items-center gap-1 border p-1 md:p-2 rounded-md"
                    onClick={openSearchModal}
                >
                    <FiSearch className="h-3 w-3 md:w-6 md:h-6" />
                </button>

                {/* Friend Requests button */}
                <button
                    className="mr-4 flex items-center gap-1 border p-1 md:p-2 rounded-md"
                    onClick={openSearchModal}
                >
                    <IoMdPersonAdd className="h-3 w-3 md:w-6 md:h-6" />
                </button>

                {/* Theme toggle button */}
                <button
                    className="mr-4 border p-1 md:p-2 rounded-md"
                    onClick={handleSwitch}
                >
                    {theme === "dark" ? (
                        <FiSun className="h-3 w-3 md:w-6 md:h-6" />
                    ) : (
                        <FiMoon className="h-3 w-3 md:w-6 md:h-6" />
                    )}
                </button>

                {/* Profile button */}

                <div className="mr-4 relative ">
                    <button
                        className="flex items-center "
                        onClick={handleProfileButtonClick}
                    >
                        <img
                            src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png"
                            alt="name"
                            className="h-10 w-auto rounded-full object-cover"
                        />
                    </button>

                    {profileButton && (
                        <div className="z-10  w-60 absolute top-14 right-0 bg-white rounded-md shadow">
                            <div className="w-full h-full flex justify-start items-center flex-col ">
                                <button className="hover:bg-gray-400 duration-200 w-full flex items-center gap-2 text-black px-4 py-2">
                                    <IoMdPerson /> Profile
                                </button>

                                <button className="hover:bg-gray-400 duration-200 w-full flex items-center gap-2 text-black px-4 py-2">
                                    <IoMdSettings /> Settings
                                </button>

                                <button className="hover:bg-gray-400 duration-200 w-full flex items-center gap-2 text-black px-4 py-2">
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AuthNavbar;
