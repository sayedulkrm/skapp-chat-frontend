import { FaPerson, FaUser } from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";
import { MdGroup, MdMessage } from "react-icons/md";
import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import AdminAppBar from "./Utils/AdminAppBar";
import AdminWidgets from "./Utils/AdminWidgets";
import { DoughnutChart, LineChart } from "./Utils/Charts";

const Dashboard = () => {
    return (
        <main className="w-full h-full">
            <div className="w-full h-full ">
                <div className="w-full h-full min-h-screen ">
                    <AdminLayout>
                        <AdminAppBar />

                        {/* Chart Area */}
                        <div className="my-5 p-5 w-full">
                            <div className="w-full rounded-md shadow-md flex flex-col justify-start items-center p-3 bg-white text-black">
                                <p className="text-xl">Last Message</p>

                                <LineChart value={[12, 42, 54, 76, 32]} />
                            </div>

                            <div className="relative mt-5 w-1/2  rounded-md shadow-md flex justify-center items-center p-3 bg-white text-black">
                                <DoughnutChart
                                    value={[12, 20]}
                                    labels={["Single Chats", "Group Chat"]}
                                />

                                <div className="absolute flex items-center justify-center gap-5 text-xl">
                                    <MdGroup /> Vs <FaPerson />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-between items-start">
                            <AdminWidgets
                                title="Users"
                                icon={<FaUser />}
                                value={213}
                            />
                            <AdminWidgets
                                title="Message"
                                icon={<MdMessage />}
                                value={213}
                            />
                            <AdminWidgets
                                title="Chats"
                                icon={<IoChatbox />}
                                value={213}
                            />
                        </div>
                    </AdminLayout>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
