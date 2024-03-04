import { IoChatboxEllipsesOutline } from "react-icons/io5";
import AppLayout from "../../Layout/AppLayout/AppLayout";

const ChatHome = () => {
    return (
        <div className="w-full h-full relative">
            <div className="w-full h-full min-h-[89vh] flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl  font-thin">
                    Seletct A Friend To Start Chat
                </h1>

                <IoChatboxEllipsesOutline className="text-8xl " />
            </div>
        </div>
    );
};

export default AppLayout()(ChatHome);
