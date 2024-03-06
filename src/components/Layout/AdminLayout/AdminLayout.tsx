import { FC, ReactNode } from "react";
import AdminSidebar from "../../Pages/Admin/Sidebar/AdminSidebar";

interface IAdminLayout {
    children: ReactNode;
}

const AdminLayout: FC<IAdminLayout> = ({ children }) => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <div className="w-full h-full min-h-screen grid grid-cols-4">
                    <div className="w-full h-full p-3 border-r">
                        <AdminSidebar />
                    </div>

                    <div className="col-span-3 p-3 dark:bg-slate-950 bg-gray-200">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
