import { FC } from "react";

interface IAdminWidget {
    title?: string;
    value?: string | number;
    icon?: any;
}

const AdminWidgets: FC<IAdminWidget> = ({ icon, title, value }) => {
    return (
        <div className="p-5 flex flex-col md:flex-row">
            <div className="w-full rounded-md shadow-md flex flex-col min-w-[200px] justify-between items-center p-3 bg-white text-black gap-5">
                <p className="text-xl rounded-full p-5 border-4 border-slate-800">
                    {value}
                </p>
                <p className="text-xl">{icon}</p>
                <p className="text-xl">{title}</p>
            </div>
        </div>
    );
};

export default AdminWidgets;
