import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className=" h-full w-full min-h-screen flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-10 p-8  rounded-md">
                    <h1 className="text-6xl font-semibold  mb-4">
                        Welcome to skapp
                    </h1>
                    <p className=" mb-8">
                        A Real Time Chat Application. Do Chat with your friends.
                    </p>
                    <Link
                        to={"/login"}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
