const AdminLogin = () => {
    return (
        <main className="w-full h-full">
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <input
                    type="text"
                    className="w-full max-w-2xl focus:border-cyan-400 border-2 px-4 py-2 text-xl rounded-md shadow-md bg-transparent"
                    placeholder="Enter Secrect Key"
                />

                <button className="px-4 py-2 text-xl bg-cyan-400 text-white mt-5 rounded-md shadow-md">
                    Submit
                </button>
            </div>
        </main>
    );
};

export default AdminLogin;
