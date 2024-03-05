import { useEffect, useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    setOpenAddMembersBox,
    setOpenConfirmDeleteGroupBox,
} from "../../../redux/chatSlice/chatSlice";
import ToolTip from "../../Utils/ToolTip";
import GroupsList from "./GroupsList";
import AddMembersToGroup from "./Modals/AddMembersToGroup";
import ConfirmDelete from "./Modals/ConfirmDelete";

const Groups = () => {
    const navigate = useNavigate();
    const chatId = useSearchParams()[0].get("group");

    const dispatch = useDispatch();

    const users: any = [
        {
            _id: 124353,
            avatar: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
            name: "John Doe",
        },

        {
            _id: 124366345453,
            avatar: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
            name: "Jack Doe",
        },

        {
            _id: 126678453,
            avatar: "https://sb.kaleidousercontent.com/67418/960x550/d1e78c2a25/individuals-a.png",
            name: "Sam Doe",
        },
    ];

    // Group
    const [isEdit, setIsEdit] = useState(false);

    const [dbGroupName, setDbGroupName] = useState("");

    const [userNewInputedGroupName, setUserNewInputedGroupName] =
        useState(dbGroupName);

    // ===========================

    const navigateBack = () => {
        navigate("/chat");
    };

    const updateGroupNameHandler = () => {
        setIsEdit(false);
    };

    const GroupName = (
        <div>
            {" "}
            {isEdit ? (
                <div className=" h-16 flex justify-center items-center gap-4">
                    <input
                        type="text"
                        value={userNewInputedGroupName}
                        onChange={(e) =>
                            setUserNewInputedGroupName(e.target.value)
                        }
                        className="px-4 py-1 rounded-md w-full max-w-2xl bg-transparent focus:border-cyan-400 border"
                    />

                    <button
                        className="flex items-center gap-2 bg-green-400 p-2 rounded-md"
                        onClick={updateGroupNameHandler}
                    >
                        <FiSave className="text-xl" />
                        <p>Save</p>
                    </button>
                </div>
            ) : (
                <div className="h-16 flex justify-center items-center gap-4">
                    {/* Have to get grop name */}
                    <p className="text-2xl">Group name</p>

                    <ToolTip tooltip="Edit">
                        <button className="p-2" onClick={() => setIsEdit(true)}>
                            <FiEdit className="text-xl" />
                        </button>
                    </ToolTip>
                </div>
            )}{" "}
        </div>
    );

    // Button Group

    const openConfirmDeleteHandler = () => {
        dispatch(setOpenConfirmDeleteGroupBox(true));
    };

    const openAddMember = () => {
        dispatch(setOpenAddMembersBox(true));
    };

    const ButtonGroup = (
        <div className="w-full flex items-center justify-between p-2 gap-5">
            <button
                onClick={openConfirmDeleteHandler}
                className="bg-red-400 rounded-md px-4 py-2 text-sm font-semibold"
            >
                Delete Group
            </button>
            <button
                onClick={openAddMember}
                className="bg-cyan-400 rounded-md px-4 py-2 text-sm font-semibold"
            >
                Add Member
            </button>
        </div>
    );

    useEffect(() => {
        if (chatId) {
            setDbGroupName("Group Name");
            setUserNewInputedGroupName("Group Name");
        }

        return () => {
            setDbGroupName("");
            setUserNewInputedGroupName("");
            setIsEdit(false);
        };
    }, [chatId]);

    return (
        <div className="w-full h-full">
            <div className="w-full h-full grid min-h-screen grid-cols-3 ">
                <div className="dark:bg-slate-950 bg-gray-200 col-span-1 p-3">
                    <GroupsList />
                </div>

                <div className="col-span-2 p-3">
                    <div className="w-full h-full">
                        <div className="w-full flex items-start my-2">
                            <ToolTip tooltip="Back">
                                <button
                                    onClick={navigateBack}
                                    className="p-1 rounded-full bg-cyan-400 text-white"
                                >
                                    <MdOutlineKeyboardBackspace className="text-xl" />
                                </button>
                            </ToolTip>

                            <div className="w-full flex justify-center items-center">
                                {dbGroupName && (
                                    <div className="w-full flex flex-col gap-5">
                                        {GroupName}

                                        <div className="w-full flex flex-col gap-3">
                                            <p className="text-lg font-thin">
                                                Members:
                                            </p>

                                            <div className=" flex flex-wrap justify-center items-center w-full gap-5 p-2 rounded-md dark:bg-slate-800 bg-gray-400 h-[550px] overflow-auto">
                                                {users?.map((user: any) => {
                                                    return (
                                                        <div
                                                            key={user?._id}
                                                            className="w-[300px] h-[500px] group relative block overflow-hidden"
                                                        >
                                                            <div className="relative overflow-hidden ">
                                                                <img
                                                                    src={
                                                                        user?.avatar
                                                                    }
                                                                    alt="image user"
                                                                    className=" h-[300px] w-auto object-cover opacity-100"
                                                                />
                                                            </div>

                                                            <div className="  flex flex-col items-start justify-end p-6">
                                                                <h3 className="text-xl font-medium text-white">
                                                                    {user?.name}
                                                                </h3>

                                                                <p className="mt-1.5 text-pretty text-xs text-white">
                                                                    Lorem ipsum
                                                                    dolor sit
                                                                    amet
                                                                    consectetur
                                                                    adipisicing
                                                                    elit.
                                                                    Dignissimos
                                                                    sequi dicta
                                                                    impedit
                                                                    aperiam
                                                                    ipsum!
                                                                </p>

                                                                <button className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {ButtonGroup}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDelete />
            <AddMembersToGroup />
        </div>
    );
};

export default Groups;
