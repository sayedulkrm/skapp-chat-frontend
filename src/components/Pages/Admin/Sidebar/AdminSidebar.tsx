import { IoChatboxOutline } from "react-icons/io5";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard,
    },

    {
        name: "Users",
        path: "/admin/user",
        icon: MdManageAccounts,
    },

    {
        name: "Chats",
        path: "/admin/chats",
        icon: IoChatboxOutline,
    },

    {
        name: "Message",
        path: "/admin/message",
        icon: RiMessage2Line,
    },
];

const AdminSidebar = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-col gap-5">
                {adminTabs.map((tab, index) => (
                    <Link
                        to={tab.path}
                        className="w-full flex justify-start items-center gap-5 hover:bg-cyan-500 hover:text-white duration-300 p-3 rounded-md"
                        key={index}
                    >
                        <tab.icon className="text-2xl" />

                        <p className="text-xl font-semibold">{tab.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;
