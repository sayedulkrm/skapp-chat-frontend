import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import ChatTable from "./Utils/ChatTable";

const ChatManagment = () => {
    return (
        <AdminLayout>
            <div className="w-full h-full">
                <div className="w-full h-full max-w-[1400px] m-auto ">
                    <div className="w-full h-full  p-5 flex flex-col gap-10">
                        <h1 className="text-2xl">Chat</h1>

                        <div className="w-full my-5 flex justify-center items-center">
                            <ChatTable />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ChatManagment;
