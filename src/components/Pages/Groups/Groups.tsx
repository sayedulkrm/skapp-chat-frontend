import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ToolTip from "../../Utils/ToolTip";
import { useNavigate } from "react-router-dom";
import GroupsList from "./GroupsList";

const Groups = () => {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate("/chat");
    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full grid min-h-screen grid-cols-3 ">
                <div className="dark:bg-slate-950 bg-gray-200 col-span-1 p-3">
                    <GroupsList />
                </div>

                <div className="col-span-2 p-3">
                    <div className="w-full h-full">
                        <div className="w-full flex ">
                            <ToolTip tooltip="Back">
                                <button
                                    onClick={navigateBack}
                                    className="p-1 rounded-full bg-cyan-400 text-white"
                                >
                                    <MdOutlineKeyboardBackspace className="text-xl" />
                                </button>
                            </ToolTip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Groups;
