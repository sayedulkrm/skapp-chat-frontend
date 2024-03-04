import { FormEvent, useRef } from "react";
import AppLayout from "../../Layout/AppLayout/AppLayout";

import { MdOutlineAttachFile } from "react-icons/md";

import { RiSendPlaneLine } from "react-icons/ri";
import FileMenu from "./Dialogs/FileMenu";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAttachmentDialogBox } from "../../../redux/chatSlice/chatSlice";
import MessageComponents from "./MessageComponents/MessageComponents";

const Chat = () => {
    const sampleMessage = [
        {
            attachments: [],

            content: "What is Lion?",
            _id: "123wdq423r213",
            sender: {
                _id: "XXXXXXXXXXXXX",
                name: "John Doe",
            },

            chat: "chatId",
            createdAt: "2022-01-01",
        },

        {
            attachments: [
                {
                    public_id: "123ewf",
                    url: "https://img.freepik.com/free-photo/view-wild-lion-nature_23-2150460851.jpg",
                },
            ],

            content: "",
            _id: "123wdq423r213",
            sender: {
                _id: "123chds",
                name: "John Doe",
            },

            chat: "chatId",
            createdAt: "2022-01-01",
        },
    ];

    const containerRef = useRef(null);

    const dispatch = useDispatch();

    const { openAttachmentDialogBox } = useSelector(
        (state: RootState) => state.chat
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log("submited");
    };

    return (
        <div className="w-full h-full min-h-[89vh] ">
            {/* message */}
            <div
                className="w-full h-[80vh] min-h-[80vh] overflow-y-auto flex flex-col"
                ref={containerRef}
            >
                {sampleMessage?.map((item, index) => (
                    <MessageComponents message={item} key={index} />
                ))}
            </div>

            {/* Input */}

            <form
                onSubmit={handleSubmit}
                className="w-full flex relative justify-between items-center h-[9vh] border px-1 rounded-md dark:bg-slate-700 bg-gray-300"
            >
                <textarea
                    // value={userInputText}

                    // onKeyDown={handleKeyDown}

                    placeholder="Type something..."
                    className="w-full px-2 py-2  md:px-4  placeholder:text-gray-500 md:py-2 h-[3rem] min-h-[3rem] max-h-[3rem]  bg-transparent text-xs md:text-base rounded-full"
                />

                <div className="flex items-center gap-3 ">
                    <button
                        type="submit"
                        className="p-3 flex justify-center items-center text-xs md:text-base rounded-full bg-gradient-to-tr  from-red-400 to-blue-500 text-white"
                    >
                        <RiSendPlaneLine />
                    </button>

                    <button
                        onClick={() =>
                            dispatch(
                                setOpenAttachmentDialogBox(
                                    !openAttachmentDialogBox
                                )
                            )
                        }
                        className="p-3 flex justify-center items-center text-xs md:text-base rounded-full bg-gradient-to-tr  from-red-400 to-blue-500 text-white"
                    >
                        <MdOutlineAttachFile />
                    </button>

                    <div className="absolute bottom-20 right-0">
                        {openAttachmentDialogBox && <FileMenu />}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppLayout()(Chat);
