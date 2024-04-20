import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import AuthNavbar from "../../Layout/Navbar/AuthNavbar";
import Navbar from "../../Layout/Navbar/Navbar";

const Home = () => {
    // const dispatch = useDispatch<AppDispatch>();
    // const [loading, setLoading] = useState(false);

    const { user } = useSelector((state: RootState) => state.auth);

    // const googleAuth = () => {
    //     window.open(
    //         `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
    //         "_self"
    //     );
    // };

    // const handleLogout = async () => {
    //     setLoading(true);
    //     await dispatch(userLogout());
    //     // await dispatch(Ggi());

    //     setLoading(false);
    // };

    return (
        <>
            {user ? <AuthNavbar /> : <Navbar />}
            <div className=" h-full w-full min-h-screen flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-10 p-8  rounded-md">
                    <h1 className="text-6xl font-semibold  mb-4">
                        Welcome to skapp
                    </h1>
                    <p className=" mb-8">
                        A Real Time Chat Application. Do Chat with your friends.
                    </p>
                    <Link
                        to={"/chat"}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Get Started
                    </Link>

                    {/* {user ? <>user is there</> : <>User is not there</>}

                    <button
                        onClick={googleAuth}
                        className="w-full py-3 bg-red-500 rounded-md text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Login with Google
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-yellow-700 rounded-md text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        {loading ? "Loading..." : "logout"}
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default Home;
