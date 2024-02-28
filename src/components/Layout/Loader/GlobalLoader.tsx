import { Rings } from "react-loader-spinner";

const GlobalLoader = () => {
    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center">
            <Rings
                visible={true}
                height="80"
                width="80"
                color="#00FFFF"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default GlobalLoader;
