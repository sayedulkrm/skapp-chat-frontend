import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    setGroupName,
    setNewGroupModal,
    setNewGroupPeoples,
    setSearchPeople,
} from "../../../../redux/navbarSlice/navbarSlice";
import { RootState } from "../../../../redux/store";
import { useAvailableFriendsQuery } from "../../../../redux/api/apiSlice";
import { useErrors } from "../../../Hooks/Hooks";
import InboxSkeleton from "../../Loader/Skeleton/InboxSkeleton";

const NewGroupModals = () => {
    const dispatch = useDispatch();

    const { newGroupModal, searchPeople, newGroupName, newGroupPeoples } =
        useSelector((state: RootState) => state.navbar);

    const { isError, isLoading, error, data } = useAvailableFriendsQuery("");

    const errors = [
        {
            isError,
            error,
        },
    ];

    console.log("hey am from new group", data);

    useErrors(errors);

    const selectMemeberHandler = (user: any) => {
        dispatch(setNewGroupPeoples(user));
    };

    // console.log(newGroupPeoples);

    const isUserSelected = (userId: any) => {
        return newGroupPeoples.some((member) => member._id === userId);
    };

    // const toggleMemberSelection = (userId : any) => {
    //     if (newGroupPeoples.includes(userId)) {
    //       // If already selected, remove it
    //       dispatch(
    //         setNewGroupPeoples(newGroupPeoples.filter((id) => id !== userId))
    //       );
    //     } else {
    //       // If not selected, add it
    //       dispatch(setNewGroupPeoples([...newGroupPeoples, userId]));
    //     }
    //   };

    // Friend Reqest Handler

    const submitHandler = () => {
        console.log(newGroupName, newGroupPeoples);
    };

    return (
        <div
            className={
                " fixed overflow-hidden  z-10 bg-gray-900 bg-opacity-70 inset-0 transform ease-in-out" +
                (newGroupModal
                    ? " transition-opacity opacity-100 duration-500 translate-y-0  "
                    : " transition-all delay-500 opacity-0 translate-y-full  ")
            }
        >
            <div className="h-full w-full flex justify-center items-center">
                <section
                    className={
                        " w-[600px] h-[700px]   bg-gray-400 dark:bg-slate-800  shadow-xl delay-400 duration-500 ease-in-out overflow-auto transition-all transform rounded-md " +
                        (newGroupModal
                            ? " !translate-y-0 "
                            : " translate-y-full ")
                    }
                >
                    <div className="w-full h-auto flex flex-col justify-center items-center p-5 gap-5">
                        <div className="w-full">
                            <button
                                className="px-4 py-2 border text-white font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                onClick={() =>
                                    dispatch(setNewGroupModal(false))
                                }
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        {/* =========================== main div  */}
                        <div className="w-full h-full">
                            <h1 className="mb-5 text-center text-2xl font-semibold">
                                {" "}
                                New Group
                            </h1>

                            {/* {users?.length > 0 ? ( */}
                            <div className="w-full h-full flex flex-col gap-3">
                                <h1 className="text-2xl">Find People</h1>
                                <input
                                    type="text"
                                    value={searchPeople}
                                    className="border-2 focus:border-blue-400 bg-transparent rounded-md text-sm px-4 py-2"
                                    onChange={(e) =>
                                        dispatch(
                                            setSearchPeople(e.target.value)
                                        )
                                    }
                                />

                                <h1 className="text-2xl">Group Name</h1>
                                <input
                                    type="text"
                                    value={newGroupName}
                                    className="border-2 focus:border-blue-400 bg-transparent rounded-md text-sm px-4 py-2"
                                    onChange={(e) =>
                                        dispatch(setGroupName(e.target.value))
                                    }
                                />

                                <div className="my-5 w-full h-full max-h-[260px] overflow-y-auto flex flex-col gap-5 scrollhost">
                                    {isLoading ? (
                                        <div>
                                            {Array.from({ length: 5 }).map(
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className=""
                                                    >
                                                        <InboxSkeleton />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        data?.friends?.map((user: any) => {
                                            const { name, _id, avatar } = user;

                                            return (
                                                <div
                                                    key={_id}
                                                    className="flex justify-between items-center gap-5"
                                                >
                                                    {/* image */}

                                                    <div className="flex justify-center items-center gap-5">
                                                        <div className="">
                                                            <img
                                                                src={avatar}
                                                                alt={name}
                                                                className="w-14 h-14 object-cover rounded-full"
                                                            />
                                                        </div>

                                                        {/* name */}
                                                        <h1 className="text-xl line-clamp-1">
                                                            {name}
                                                        </h1>
                                                    </div>

                                                    {/* Add friend */}

                                                    <button
                                                        onClick={() =>
                                                            selectMemeberHandler(
                                                                user
                                                            )
                                                        }
                                                        className={`w-16 ${
                                                            isUserSelected(
                                                                user._id
                                                            )
                                                                ? "bg-red-400"
                                                                : "bg-cyan-500"
                                                        } p-2 rounded-md text-sm `}
                                                    >
                                                        {isUserSelected(
                                                            user._id
                                                        )
                                                            ? "Remove"
                                                            : "Add"}
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="w-full flex justify-between items-center ">
                                    <button className="px-4 py-2 rounded-md bg-red-500  text-white">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitHandler}
                                        className="px-4 py-2 rounded-md bg-cyan-400 text-white"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            {/* ) : (
                                <p className="w-full h-full flex justify-center items-center my-5 text-xl">
                                    No Notifications
                                </p>
                            )} */}
                        </div>
                    </div>
                </section>
            </div>

            <section
                className=" w-screen h-full  cursor-pointer "
                // onClick={() => dispatch(closeCartBox())}
            ></section>
        </div>
    );
};

export default NewGroupModals;
