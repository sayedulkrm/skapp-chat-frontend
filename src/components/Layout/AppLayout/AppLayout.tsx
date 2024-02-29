// You can use that if you want to use diffrent Navbar and foorter for auth users

import { FiList } from "react-icons/fi";
import Title from "../../Shared/Title";
import AuthNavbar from "../Navbar/AuthNavbar";
// import InboxSkeleton from "../Loader/Skeleton/InboxSkeleton";
import InboxList from "../../Pages/Chat/InboxList/InboxList";
import { useParams } from "react-router-dom";
import ProfileView from "../../Pages/Chat/ProfileView/ProfileView";

const AppLayout = () => (WrappedComponent: any) => {
    return (props: any) => {
        const params = useParams();

        const chatId = params.chatId;

        console.log(chatId);
        // Have to sent the id to redux

        return (
            <div className="w-full h-full ">
                <Title />
                {/* header */}
                <AuthNavbar />

                <div className="w-full h-full min-h-[92vh] relative">
                    <div className="w-full h-full flex justify-start items-start">
                        {/* chatlish */}

                        <div className="hidden md:block w-1/5 h-full max-h-[92vh]  overflow-y-auto  p-3">
                            {/* {Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="w-full h-full">
                                    <InboxSkeleton />
                                </div>
                            ))} */}

                            <InboxList />
                        </div>
                        {/* for mobile */}

                        <button
                            className={`absolute md:hidden rounded-full text-xl bg-white p-2 top-1 left-1`}
                        >
                            <FiList className="text-black " />
                        </button>

                        {/* Chatpage */}
                        <div className="w-full md:w-4/5 h-full  p-3">
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
