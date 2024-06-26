import { useEffect, useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMyGroupChatsQuery } from "../../../redux/api/apiSlice";
import {
    setOpenAddMembersBox,
    setOpenConfirmDeleteGroupBox,
} from "../../../redux/chatSlice/chatSlice";
import { useErrors } from "../../Hooks/Hooks";
import InboxSkeleton from "../../Layout/Loader/Skeleton/InboxSkeleton";
import ToolTip from "../../Utils/ToolTip";
import GroupsList from "./GroupsList";
import AddMembersToGroup from "./Modals/AddMembersToGroup";
import ConfirmDelete from "./Modals/ConfirmDelete";
import { useChatDetailsQuery } from "../../../redux/chatSlice/chatApi";

const Groups = () => {
    const navigate = useNavigate();
    const chatId = useSearchParams()[0].get("group");

    const dispatch = useDispatch();

    const myGroups = useMyGroupChatsQuery("");

    const groupDetails = useChatDetailsQuery(
        { chatId, populate: true },
        { skip: !chatId }
    );

    console.log(groupDetails.data);

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
                    {/* <p className="text-2xl">Group name</p> */}
                    <p className="text-2xl">{dbGroupName}</p>

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

    const errors = [
        {
            isError: myGroups.isError,
            error: myGroups.error,
            // fallback: () => {
            //     toast.error(
            //         myGroups.error?.data?.message || "Something went wrong"
            //     );
            // }
        },

        {
            isError: groupDetails.isError,
            error: groupDetails.error,
            // fallback: () => {
            //     toast.error(
            //         myGroups.error?.data?.message || "Something went wrong"
            //     );
            // }
        },
    ];

    useErrors(errors);

    useEffect(() => {
        if (groupDetails.data as any) {
            setDbGroupName(groupDetails?.data?.chat?.name);
            setUserNewInputedGroupName(groupDetails?.data?.chat?.name);
        }
    }, [groupDetails.data]);

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
                    {myGroups.isLoading ? (
                        <>
                            {" "}
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="">
                                    <InboxSkeleton />
                                </div>
                            ))}
                        </>
                    ) : (
                        <GroupsList />
                    )}
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
                                                {groupDetails?.data?.chat?.members?.map(
                                                    (user: any) => {
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
                                                                        {
                                                                            user?.name
                                                                        }
                                                                    </h3>

                                                                    <p className="mt-1.5 text-pretty text-xs text-white">
                                                                        Lorem
                                                                        ipsum
                                                                        dolor
                                                                        sit amet
                                                                        consectetur
                                                                        adipisicing
                                                                        elit.
                                                                        Dignissimos
                                                                        sequi
                                                                        dicta
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
                                                    }
                                                )}
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
