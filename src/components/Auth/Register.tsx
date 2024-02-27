import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../../redux/authSlice/authReducers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    clearAuthError,
    clearAuthMesssage,
} from "../../redux/authSlice/authSlice";

const Register: FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { isAuthLoading, authError, authMessage } = useAppSelector(
        (state) => state.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            return toast.error("Confirmation Password is incorrect");
        }

        const data = {
            name,
            email,
            password,
            avatar,
        };
        console.log("submit", data);

        await dispatch(userRegister(data));
    };

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        setAvatar(file);

        // Create a preview of the selected image
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                // Set the preview to the image data URL
                // You can display this URL in an <img> element
                const previewURL = event.target.result;
                console.log("Avatar Preview URL:", previewURL);
            };
            reader.readAsDataURL(file);
        }
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
            navigate("/verify");
        }

        if (authError) {
            toast.error(authError);
            dispatch(clearAuthError());
        }
    }, [authError, authMessage]);

    return (
        <div className="min-h-screen  flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className=" shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <h3 className="text-2xl font-semibold">Register</h3>

                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-6">
                                {/* Add input for avatar upload */}
                                <label
                                    htmlFor="avatar"
                                    className="block mb-2 text-sm"
                                >
                                    Avatar
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="w-full p-3 rounded border-2 border-gray-300"
                                />
                                {avatar && (
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="Avatar Preview"
                                        className="mt-2 rounded"
                                        style={{ maxWidth: "100px" }}
                                    />
                                )}
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm "
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full dark:text-[#000] p-3 rounded border-2 border-gray-300"
                                    placeholder="Your Full Name"
                                    required
                                />
                            </div>

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
                                    className="w-full p-3 dark:text-[#000] rounded border-2 border-gray-300"
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
                                    className="w-full p-3 dark:text-[#000] rounded border-2 border-gray-300"
                                    placeholder="Your Password"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block mb-2 text-sm "
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className="w-full dark:text-[#000] p-3 rounded border-2 border-gray-300"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 mt-4 bg-blue-600 rounded-md
                        text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                            >
                                {isAuthLoading ? "Loading..." : "Register"}
                            </button>
                        </form>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                already registered ?
                                <Link
                                    to="/login"
                                    className="py-2 text-blue-500 hover:text-blue-700 text-sm
                            font-medium transition duration-300"
                                >
                                    {" "}
                                    Login{" "}
                                </Link>
                                here.
                            </div>
                        </div>
                    </div>

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

export default Register;
