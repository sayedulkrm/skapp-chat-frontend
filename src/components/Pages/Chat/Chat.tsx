import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../../Layout/AppLayout/AppLayout";

import { MdOutlineAttachFile } from "react-icons/md";

import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import {
    useChatDetailsQuery,
    useGetOldMessagesQuery,
} from "../../../redux/chatSlice/chatApi";
import { setOpenAttachmentDialogBox } from "../../../redux/chatSlice/chatSlice";
import { RootState } from "../../../redux/store";
import { useSocket } from "../../../socket";
import {
    ALERT,
    NEW_MESSAGE,
    START_TYPING,
    STOP_TYPING,
} from "../../Constants/events";
import { useErrors, useSocketEvents } from "../../Hooks/Hooks";
import GlobalLoader from "../../Layout/Loader/GlobalLoader";
import SpinLoader from "../../Layout/Loader/SpinLoader";
import FileMenu from "./Dialogs/FileMenu";
import MessageComponents from "./MessageComponents/MessageComponents";

const Chat = ({ chatId }: any) => {
    // const params = useParams();
    // const chatId = params.chatId;
    // // console.log(chatId);

    const socket = useSocket();

    // const [allMessage, setAllMessage] = useState<any[]>([]);
    const containerRef = useRef<any>(null);
    // const scrollRef = useRef<any>(null);
    const [message, setMessage] = useState("");
    const [allOlderMessage, setAllOlderMessage] = useState<any>([]);
    const [newMessage, setNewMessage] = useState<any>([]);
    const [page, setPage] = useState(1);

    const [iAmTyping, setIAmTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);

    const typingTimeOut = useRef<any>(null);
    const bottomRef = useRef<any>(null);

    // console.log("HEYYY AM THE PAGE NUMBR ========", page);

    // const [hasMore, setHasMore] = useState(true);

    const dispatch = useDispatch();

    const { openAttachmentDialogBox } = useSelector(
        (state: RootState) => state.chat
    );

    const {
        data: oldMessages,
        isLoading: isOldMessagesLoading,
        isError: isOldMessageError,
        error: oldMessageError,
        // refetch: refetchOldMessages,
    } = useGetOldMessagesQuery({ chatId, page });

    // console.log(oldMessages);

    const totalPages = oldMessages?.totalPages;

    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: isOldMessageError, error: oldMessageError },
    ];

    const members = chatDetails.data?.chat?.members;

    const handleMessageOnChanges = (e: any) => {
        setMessage(e.target.value);

        if (!iAmTyping) {
            socket.emit(START_TYPING, { chatId, members });
            setIAmTyping(true);
        }

        if (typingTimeOut.current) {
            clearTimeout(typingTimeOut.current);
        }

        typingTimeOut.current = setTimeout(() => {
            socket.emit(STOP_TYPING, { chatId, members });
            setIAmTyping(false);
        }, 2000);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        // Emitting messages to server
        socket.emit(NEW_MESSAGE, { chatId, members, message });

        setMessage("");

        console.log("submited");
    };

    const newMessageHandler = useCallback(
        (data: any) => {
            // setAllMessage((prev) => [...prev, data.message]);
            // 4:27:00 --- video
            if (data.chatId !== chatId) {
                console.log("HEYY I RETURN");
                return;
            } else {
                setNewMessage((prev: any) => [...prev, data.message]);
            }
        },
        [chatId]
    );

    const startTypingListenerHandler = useCallback(
        (data: any) => {
            // setAllMessage((prev) => [...prev, data.message]);
            // 5:00:00 --- video
            if (data.chatId !== chatId) {
                return;
            }

            setUserTyping(true);
        },
        [chatId]
    );

    const stopTypingListenerHandler = useCallback(
        (data: any) => {
            // setAllMessage((prev) => [...prev, data.message]);
            // 5:00:00 --- video
            if (data.chatId !== chatId) {
                return;
            }

            setUserTyping(false);
        },
        [chatId]
    );

    const alertListener = useCallback(
        (data: any) => {
            // 5:20:00 --- video

            const messageForAlert = {
                content: data,

                sender: {
                    _id: Math.random(), //user.id,
                    name: "Admin", //user.name
                },
                chatId,

                createdAt: new Date().toISOString(),
            };

            setNewMessage((prev: any) => [...prev, messageForAlert]);
        },
        [chatId]
    );

    const eventArray = {
        [NEW_MESSAGE]: newMessageHandler,
        [ALERT]: alertListener,
        [START_TYPING]: startTypingListenerHandler,
        [STOP_TYPING]: stopTypingListenerHandler,
    };

    useSocketEvents(socket, eventArray);

    useErrors(errors);

    const DBandSockectMessages = [
        // ...(oldMessages?.messages || []),
        ...allOlderMessage,
    ];

    const handleInfiniteScroll = () => {
        if (containerRef.current) {
            const { scrollTop } = containerRef.current;
            const threshold = 1;

            // Check if user has scrolled close to the top and there are more pages available
            if (scrollTop < threshold && !isOldMessagesLoading && hasMore) {
                console.log("User has reached the top, loading more messages");
                // refetchOldMessages();

                setPage((prevPage) => prevPage + 1); // Increment page number
            }
        }
    };

    // it can be done like this
    const hasMore = !(page >= totalPages);

    // useEffect(() => {
    //     // refetchOldMessages();
    //     return () => {
    //         setAllOlderMessage([]);
    //         setNewMessage([]);
    //         setMessage("");
    //         setPage(1);
    //     };
    // }, [chatId]);

    // useEffect(() => {
    //     if (page >= totalPages) {
    //         setHasMore(false);
    //     }
    // }, [page, totalPages]);

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
        if (chatDetails?.data?.chat?._id === chatId) {
            if (oldMessages) {
                // setAllMessage((prev) => [...prev, ...oldMessages.messages]);
                setAllOlderMessage((prev: any) => [
                    ...(oldMessages?.messages || []),
                    ...prev,
                ]);
            }
        } else {
            return;
        }
    }, [oldMessages]);

    // Function to scroll the chat to the bottom
    const scrollToBottom = () => {
        if (bottomRef.current) {
            // containerRef.current.scrollTop = containerRef.current.scrollHeight;
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // const scrollToBottomSecound = () => {
    //     if (containerRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } =
    //             containerRef.current;
    //         const bottomThreshold =
    //             scrollHeight - clientHeight - clientHeight / 3;

    //         if (scrollTop >= bottomThreshold) {
    //             scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    //         }
    //     }
    // };

    useEffect(() => {
        // Scroll to the bottom initially when the page loads
        scrollToBottom();
    }, [allOlderMessage, newMessage]);

    useEffect(() => {}, []);

    return (
        <>
            {chatDetails.isLoading ? (
                <GlobalLoader />
            ) : (
                <div className="w-full h-full min-h-[89vh] ">
                    {/* message */}
                    <div
                        className="w-full h-[80vh] min-h-[80vh] overflow-y-auto flex flex-col gap-5 py-5 "
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

                        {DBandSockectMessages.map(
                            (item: any, index: number) => (
                                <div key={index}>
                                    <MessageComponents
                                        message={item}
                                        key={index}
                                    />
                                </div>
                            )
                        )}
                        {newMessage.map((item: any, index: number) => (
                            <div key={index}>
                                <MessageComponents message={item} key={index} />
                            </div>
                        ))}

                        {userTyping && (
                            // <div className="flex flex-col gap-3">
                            <div className="lds-ellipsis">
                                <div className="bg-gray-300 dark:bg-white"></div>
                                <div className="bg-gray-300 dark:bg-white"></div>
                                <div className="bg-gray-300 dark:bg-white"></div>
                                <div className="bg-gray-300 dark:bg-white"></div>
                            </div>
                            // </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}

                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex relative justify-between items-center h-[9vh] border px-1 rounded-md dark:bg-slate-700 bg-gray-300"
                    >
                        <textarea
                            value={message}
                            onChange={handleMessageOnChanges}
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
