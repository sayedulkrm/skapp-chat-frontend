import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiLogIn } from "react-icons/fi";

const Navbar = () => {
    const initialTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(initialTheme);

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
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
        <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center ">
            {/* Logo */}
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold">skapp</h1>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center">
                {/* Theme toggle button */}
                <button className="mr-4" onClick={handleSwitch}>
                    {theme === "dark" ? (
                        <FiSun className="w-6 h-6" />
                    ) : (
                        <FiMoon className="w-6 h-6" />
                    )}
                    {/* Change this icon to the moon icon when theme changes */}
                </button>

                {/* Login button */}
                <button className="flex justify-center items-center gap-5 border border-black dark:border-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-800">
                    <FiLogIn className="w-6 h-6 mr-1" />
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
