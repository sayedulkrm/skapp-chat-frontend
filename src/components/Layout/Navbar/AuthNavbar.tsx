import { useEffect, useState } from "react";
import {
    FiBell,
    FiLogOut,
    FiMoon,
    FiSearch,
    FiSun,
    FiUsers,
} from "react-icons/fi";
// import { Link } from "react-router-dom";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";

import { userLogout } from "../../../redux/authSlice/authReducers";
import {
    setNewGroupModal,
    setNotificationCount,
    setNotificationModal,
    setSearchModal,
} from "../../../redux/navbarSlice/navbarSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import NewGroupModals from "./Modals/NewGroupModals";
import NotificationModals from "./Modals/NotificationModals";
import SearchModals from "./Modals/SearchModals";

const AuthNavbar = () => {
    const initialTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(initialTheme);

    const dispatch = useDispatch<AppDispatch>();

    const { notificationModal } = useSelector(
        (state: RootState) => state.navbar
    );

    const { user } = useSelector((state: RootState) => state.auth);
    const { notificationCount } = useSelector(
        (state: RootState) => state.navbar
    );

    const [profileButton, setProfileButton] = useState(false);

    const navigate = useNavigate();

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const openSearchModal = () => {
        dispatch(setSearchModal(true));
    };

    const navigateToGroup = () => {
        navigate("/groups");
    };

    const handleProfileButtonClick = () => {
        setProfileButton(!profileButton);
    };

    const openNotificationsBox = () => {
        dispatch(setNotificationModal(true));
        dispatch(setNotificationCount(0));
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
        <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center h-[8vh] shadow-md ">
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
                    {notificationCount > 0 && (
                        <div className="h-5 w-5 absolute rounded-full bg-red-500 -top-2 -right-2 text-white text-xs font-semibold flex justify-center items-center ">
                            {notificationCount > 9 ? "9+" : notificationCount}
                        </div>
                    )}

                    {notificationModal && <NotificationModals />}
                </div>

                {/* Groups button */}
                <button
                    className="mr-4 flex items-center gap-1 border p-1 md:p-2 rounded-md"
                    onClick={navigateToGroup}
                >
                    <FiUsers className="h-3 w-3 md:w-6 md:h-6" />
                </button>

                {/* Search button */}
                <div className="mr-4 relative">
                    <button
                        className=" flex items-center gap-1 border p-1 md:p-2 rounded-md relative"
                        onClick={openSearchModal}
                    >
                        <FiSearch className="h-3 w-3 md:w-6 md:h-6" />
                    </button>

                    <SearchModals />
                </div>

                {/* New Group button */}
                <div className="mr-4 relative">
                    <button
                        className="mr-4 flex items-center gap-1 border p-1 md:p-2 rounded-md"
                        onClick={() => dispatch(setNewGroupModal(true))}
                    >
                        <FaPeopleGroup className="h-3 w-3 md:w-6 md:h-6" />
                    </button>

                    <NewGroupModals />
                </div>

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
                            src={user?.avatar.url}
                            alt={user?.name}
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

                                <button
                                    onClick={() => dispatch(userLogout())}
                                    className="hover:bg-gray-400 duration-200 w-full flex items-center gap-2 text-black px-4 py-2"
                                >
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
