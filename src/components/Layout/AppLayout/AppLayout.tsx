// You can use that if you want to use diffrent Navbar and foorter for auth users

import { FiList } from "react-icons/fi";
import Title from "../../Shared/Title";
import AuthNavbar from "../Navbar/AuthNavbar";
// import InboxSkeleton from "../Loader/Skeleton/InboxSkeleton";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMyChatsQuery } from "../../../redux/api/apiSlice";
import { setNotificationCount } from "../../../redux/navbarSlice/navbarSlice";
import { RootState } from "../../../redux/store";
import { getSocket } from "../../../socket";
import { NEW_MESSAGE_ALEART, NEW_REQUEST } from "../../Constants/events";
import { useErrors, useSocketEvents } from "../../Hooks/Hooks";
import InboxList from "../../Pages/Chat/InboxList/InboxList";
import ProfileView from "../../Pages/Chat/ProfileView/ProfileView";
import InboxSkeleton from "../Loader/Skeleton/InboxSkeleton";

const AppLayout = () => (WrappedComponent: any) => {
    return (props: any) => {
        // const params = useParams();

        const dispatch = useDispatch();
        const { notificationCount } = useSelector(
            (state: RootState) => state.navbar
        );

        // const chatId = params.chatId;

        // console.log(chatId);

        const {
            isLoading: chatQuerryLoading,

            isError,
            error,
            // refetch,
        } = useMyChatsQuery("");
        // Have to sent the id to redux

        const newMessageAleartHandler = useCallback(() => {}, []);
        const newRequestNotificationHandler = useCallback(() => {
            dispatch(setNotificationCount(notificationCount + 1));
        }, [dispatch]);

        // Adding Socket io
        const socket = getSocket();

        const eventArray = {
            [NEW_MESSAGE_ALEART]: newMessageAleartHandler,
            [NEW_REQUEST]: newRequestNotificationHandler,
        };

        useSocketEvents(socket, eventArray);

        useErrors([{ isError, error }]);

        // useEffect(() => {
        //     if (isError) {
        //         const errordata = error as any;
        //         toast.error(errordata?.data?.message || "Something went wrong");
        //     }
        // }, [isError, error]);

        return (
            <div className="w-full h-full ">
                <Title />
                {/* header */}
                <AuthNavbar />

                <div className="w-full h-full min-h-[92vh] relative">
                    <div className="w-full h-full flex justify-start items-start">
                        {/* chatlish */}

                        <div className="hidden md:block w-4/12 h-full max-h-[92vh] min-h-[92vh]  overflow-y-auto border-r">
                            {chatQuerryLoading ? (
                                <>
                                    {" "}
                                    {Array.from({ length: 10 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="w-full h-full"
                                            >
                                                <InboxSkeleton />
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <InboxList />
                            )}
                        </div>
                        {/* for mobile */}

                        <button
                            className={`absolute md:hidden rounded-full text-xl bg-white p-2 top-1 left-1`}
                        >
                            <FiList className="text-black " />
                        </button>

                        {/* Chatpage */}
                        <div className="w-full md:w-8/12 h-full min-h-[92vh]  p-3 dark:bg-slate-950 bg-gray-200">
                            <WrappedComponent {...props} />
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <ProfileView />
            </div>
        );
    };
};

export default AppLayout;

// This how you will wrap your component

// And you components will get this header and footer automatically

// const Home = () =>{
//     return (
//         <div>
//             <h1>Home</h1>
//         </div>
//     )

// }

// export default AppLayout()(Home)
