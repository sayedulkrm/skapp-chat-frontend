import { IoSettingsOutline } from "react-icons/io5";
import ToolTip from "../../../Utils/ToolTip";
import { FiSearch } from "react-icons/fi";
import moment from "moment";

const AdminAppBar = () => {
    return (
        <div className="w-full p-5 bg-white text-black rounded-b-2xl">
            <div className="w-full flex items-center gap-5">
                <IoSettingsOutline className="text-5xl" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-black rounded-md px-4 py-1 text-base text-slate-900"
                />

                <ToolTip tooltip="Search">
                    <button className="p-2 rounded-md bg-cyan-400 shadow-md">
                        <FiSearch className="text-lg" />
                    </button>
                </ToolTip>

                <div className="w-full flex justify-end items-center">
                    <p className="text-xl font-medium text-slate-700">
                        {moment().format("dddd, D MMMM YYYY")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminAppBar;
