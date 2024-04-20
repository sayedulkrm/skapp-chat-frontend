import { Link, useParams } from "react-router-dom";
import AvatarGroup from "./AvatarGroup";
import { useMyChatsQuery } from "../../../../redux/api/apiSlice";

const InboxList = () => {
    const { data } = useMyChatsQuery("");

    const params = useParams();

    const chatId = params.chatId;

    // const list = {
    //     w: "100%",
    //     chats: [
    //         {
    //             _id: 124,
    //             avatar: [
    //                 "https://pikwizard.com/pw/small/efd4c9d04f7a3555c1bb8699869ace60.jpg",
    //                 "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
    //                 "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
    //                 "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
    //                 "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
    //                 "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
    //             ],
    //             name: "John Doe",
    //             lastMessage: "Hello, How are you?",
    //             groupChat: false,
    //             members: ["234", "432"],
    //             isOnline: true,
    //             sameSender: false,
    //         },
    //     ],
    //     chatId: "543",
    //     onlineUsers: [],
    //     newMessagesAleart: [
    //         {
    //             chatId: 124,
    //             count: 0,
    //         },
    //     ],
    // };

    // Handle delete chat function will be called here
    // Handle delete chat function will be called here

    const handleDeleteChat = (e: any, _id: any, groupChat: any) => {
        e.preventDefault();
        console.log("Delete chat", _id, groupChat);
    };

    return (
        <div className="w-full h-full ">
            <div className="w-full h-full">
                {data?.chats?.length > 0 ? (
                    data?.chats?.map((chat: any, i: number) => {
                        // const newMessageAlert = list?.newMessagesAleart.find(
                        //     (alert: any) => alert.chatId === chat._id
                        // );

                        // Later will add the background based on the message inbox

                        return (
                            <Link
                                to={`/chat/${chat._id}`}
                                className={` ${
                                    chatId === chat._id
                                        ? "bg-gray-400 dark:bg-black"
                                        : "bg-transparent"
                                } hover:bg-gray-500 hover:dark:bg-slate-900 duration-200 w-full h-full flex justify-center items-center py-4 px-3 border-b border-gray-200 dark:border-gray-700`}
                                key={i}
                                onContextMenu={(e) =>
                                    handleDeleteChat(
                                        e,
                                        chat?._id,
                                        chat?.groupChat
                                    )
                                }
                            >
                                <div
                                    className={`min-w-[6rem] flex justify-start items-center rounded-full mr-4 relative `}
                                >
                                    {/* {chat?.avatar?.map((avatar: any, i: number) => (
                                    <div className="">
                                        <img
                                            key={i}
                                            src={avatar}
                                            alt={"name"}
                                            className="h-12 w-12 object-cover rounded-full"
                                        />
                                    </div>
                                ))}
                                {chat.isOnline && (
                                    <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 " />
                                )} */}

                                    <AvatarGroup
                                        avatars={chat?.avatar}
                                        isOnline={chat?.isOnline}
                                    />
                                </div>

                                <div className="flex-1 ">
                                    <div className="mb-2 text-base line-clamp-1">
                                        {chat?.name}
                                    </div>

                                    <div className=" text-sm line-clamp-1">
                                        {chat?.lastMessage}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-xl text-center italic min-h-[50vh]">
                        No Chats. Send Request to start chat
                    </div>
                )}
            </div>
        </div>
    );
};

export default InboxList;
