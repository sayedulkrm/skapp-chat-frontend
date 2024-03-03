import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setNotificationModal } from "../../../../redux/navbarSlice/navbarSlice";

const NotificationModals = () => {
    const dispatch = useDispatch();

    const { notificationModal } = useSelector(
        (state: RootState) => state.navbar
    );

    const notifications: any[] = [
        {
            _id: 124366453,
            sender: {
                avatar: "https://imgupscaler.com/images/samples/animal-before.webp",
                name: "John Doe",
            },
        },
    ];

    // Friend Reqest Handler

    const friendReqestHandler = ({ _id, accept }: any) => {
        console.log("Accepting friend request", _id, accept);
    };

    return (
        <div
            className={
                " fixed overflow-hidden  z-10 bg-gray-900 bg-opacity-70 inset-0 transform ease-in-out" +
                (notificationModal
                    ? " transition-opacity opacity-100 duration-500 translate-y-0  "
                    : " transition-all delay-500 opacity-0 translate-y-full  ")
            }
        >
            <div className="h-full w-full flex justify-center items-center">
                <section
                    className={
                        " w-[600px] h-[500px]   bg-gray-400 dark:bg-slate-800  shadow-xl delay-400 duration-500 ease-in-out overflow-auto transition-all transform rounded-md " +
                        (notificationModal
                            ? " !translate-y-0 "
                            : " translate-y-full ")
                    }
                >
                    <div className="w-full h-auto flex flex-col justify-center items-center p-5 gap-5">
                        <div className="w-full">
                            <button
                                className="px-4 py-2 border text-white font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                onClick={() =>
                                    dispatch(setNotificationModal(false))
                                }
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        {/* =========================== main div  */}
                        <div className="w-full h-full">
                            {notifications?.length > 0 ? (
                                notifications?.map((item) => (
                                    <div
                                        className="w-full h-full"
                                        key={item?._id}
                                    >
                                        <div className="w-full h-full flex justify-between items-center">
                                            {/* image & name */}
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item?.sender?.avatar}
                                                    alt={item?.sender?.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />

                                                <p className="text-xl font-semibold">
                                                    {" "}
                                                    {item?.sender?.name}
                                                </p>
                                            </div>

                                            {/* Button */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        friendReqestHandler({
                                                            _id: item?._id,
                                                            accept: true,
                                                        })
                                                    }
                                                    className="px-4 py-2 text-sm text-white font-semibold rounded-md bg-cyan-400"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        friendReqestHandler({
                                                            _id: item?._id,
                                                            accept: false,
                                                        })
                                                    }
                                                    className="px-4 py-2 text-sm text-white font-semibold rounded-md bg-red-400"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="w-full h-full flex justify-center items-center my-5 text-xl">
                                    No Notifications
                                </p>
                            )}
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

export default NotificationModals;
