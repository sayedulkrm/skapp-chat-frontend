import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../../Layout/AppLayout/AppLayout";

import { MdOutlineAttachFile } from "react-icons/md";

import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    useChatDetailsQuery,
    useGetOldMessagesQuery,
} from "../../../redux/chatSlice/chatApi";
import { setOpenAttachmentDialogBox } from "../../../redux/chatSlice/chatSlice";
import { RootState } from "../../../redux/store";
import { getSocket } from "../../../socket";
import { NEW_MESSAGE } from "../../Constants/events";
import { useErrors, useSocketEvents } from "../../Hooks/Hooks";
import GlobalLoader from "../../Layout/Loader/GlobalLoader";
import SpinLoader from "../../Layout/Loader/SpinLoader";
import FileMenu from "./Dialogs/FileMenu";
import MessageComponents from "./MessageComponents/MessageComponents";

const Chat = () => {
    const params = useParams();
    const chatId = params.chatId;
    // console.log(chatId);

    const socket = getSocket();

    const [allOlderMessage, setAllOlderMessage] = useState<any>([]);

    // const [allMessage, setAllMessage] = useState<any[]>([]);
    const containerRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(1);

    console.log("HEYYY AM THE PAGE NUMBR ========", page);

    const [hasMore, setHasMore] = useState(true);

    const dispatch = useDispatch();

    const { openAttachmentDialogBox } = useSelector(
        (state: RootState) => state.chat
    );

    const {
        data: oldMessages,
        isLoading: isOldMessagesLoading,
        isError: isOldMessageError,
        error: oldMessageError,
        refetch: refetchOldMessages,
    } = useGetOldMessagesQuery({ chatId, page });

    // console.log(oldMessages);

    const totalPages = oldMessages?.totalPages;

    console.log("heres total page", totalPages);

    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: isOldMessageError, error: oldMessageError },
    ];

    const members = chatDetails.data?.chat?.members;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        // Emitting messages to server
        socket.emit(NEW_MESSAGE, { chatId, members, message });

        setMessage("");

        console.log("submited");
    };

    const newMessageHandler = useCallback((data: any) => {
        // console.log(data);
        // setAllMessage((prev) => [...prev, data.message]);
        setAllOlderMessage((prev: any) => [...prev, data.message]);
    }, []);

    const eventArray = { [NEW_MESSAGE]: newMessageHandler };

    useSocketEvents(socket, eventArray);

    useErrors(errors);

    // const DBandSockectMessages = [
    //     ...(oldMessages?.messages || []),
    //     ...allMessage,
    // ];

    const handleInfiniteScroll = () => {
        if (containerRef.current) {
            const { scrollTop } = containerRef.current;
            const threshold = 1;

            // Check if user has scrolled close to the top and there are more pages available
            if (scrollTop < threshold && !isOldMessagesLoading && hasMore) {
                console.log("User has reached the top, loading more messages");
                refetchOldMessages();

                setPage((prevPage) => prevPage + 1); // Increment page number
            }
        }
    };

    useEffect(() => {
        if (page >= totalPages) {
            setHasMore(false);
        }
    }, [page, totalPages]);

    useEffect(() => {
        // Add event listener for scroll event on the container
        if (containerRef?.current) {
            containerRef.current.addEventListener(
                "scroll",
                handleInfiniteScroll
            );
        }

        // Clean up the event listener when component unmounts
        return () => {
            if (containerRef?.current) {
                containerRef.current.removeEventListener(
                    "scroll",
                    handleInfiniteScroll
                );
            }
        };
    }, [oldMessages]);

    // Inside the useEffect hook for DBandSockectMessages
    useEffect(() => {
        if (oldMessages) {
            // setAllMessage((prev) => [...prev, ...oldMessages.messages]);
            setAllOlderMessage((prev: any) => [
                ...(oldMessages?.messages || []),
                ...prev,
            ]);
        }
    }, [oldMessages]);

    // Function to scroll the chat to the bottom
    const scrollToBottom = () => {
        if (scrollRef.current) {
            // containerRef.current.scrollTop = containerRef.current.scrollHeight;
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        // Scroll to the bottom initially when the page loads
        scrollToBottom();
    }, [allOlderMessage]);

    console.log("HAS MOREEE", hasMore);

    return (
        <>
            {chatDetails.isLoading ? (
                <GlobalLoader />
            ) : (
                <div className="w-full h-full min-h-[89vh] ">
                    {/* message */}
                    <div
                        className="w-full h-[80vh] min-h-[80vh] overflow-y-auto flex flex-col gap-5 py-5"
                        ref={containerRef}
                    >
                        {!hasMore && (
                            <p className="text-gray-400 w-full text-center mb-4">
                                No message left
                            </p>
                        )}

                        {isOldMessagesLoading && (
                            <div className="w-full flex justify-center items-center">
                                <SpinLoader />
                            </div>
                        )}

                        {allOlderMessage.map((item: any, index: number) => (
                            <div ref={scrollRef} key={index}>
                                <MessageComponents message={item} key={index} />
                            </div>
                        ))}
                    </div>

                    {/* Input */}

                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex relative justify-between items-center h-[9vh] border px-1 rounded-md dark:bg-slate-700 bg-gray-300"
                    >
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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
            )}
        </>
    );
};

export default AppLayout()(Chat);
