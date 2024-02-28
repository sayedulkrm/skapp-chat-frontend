import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../../redux/authSlice/authReducers";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import {
    clearAuthError,
    clearAuthMesssage,
} from "../../redux/authSlice/authSlice";

const Login: FC = () => {
    const dispatch = useAppDispatch();

    // const navigate = useNavigate();

    const { isAuthLoading, authError, authMessage } = useAppSelector(
        (state) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        console.log("submit", data);

        await dispatch(userLogin(data));
    };

    const googleAuth = () => {
        window.open(
            `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
            "_self"
        );
    };

    useEffect(() => {
        if (authMessage) {
            toast.success(authMessage);
            dispatch(clearAuthMesssage());
            // navigate("/profile");
        }

        if (authError) {
            toast.error(authError);
            dispatch(clearAuthError());
        }
    }, [authError, authMessage]);

    return (
        <div className="min-h-screen  flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className=" shadow-md p-3 w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <h3 className="text-2xl font-semibold">Login</h3>

                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm "
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 dark:text-black rounded border-2 border-gray-300"
                                    placeholder="Your Email Address"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full p-3 dark:text-black rounded border-2 border-gray-300"
                                    placeholder="Your Password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-blue-600 rounded-md
                        text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            >
                                {isAuthLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link
                                    to="/forgetpassword"
                                    className="py-2 text-blue-500 hover:text-blue-700 text-sm
                            font-medium transition duration-300"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="text-center sm:text-right whitespace-nowrap">
                                <Link
                                    to="/register"
                                    className="py-2 text-blue-500 hover:text-blue-700 text-sm
                            font-medium transition duration-300"
                                >
                                    Create an Account
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* "Login with Google" button */}
                    <div className="text-center py-4">
                        <button
                            onClick={googleAuth}
                            className="w-full py-3 bg-red-500 rounded-md text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
