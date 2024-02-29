import { Link } from "react-router-dom";

const ChatItem = () => {
    const list = {
        avatar: [],
        name: "",
        _id: "",
        groupChat: false,
        sameSender: false,
        isOnline: false,
        newMessageAlert: {
            id: 123,
            count: 4,
        },
        index: 0,
    };

    // Handle delete chat function will be called here

    const handleDeleteChat = (e: any, _id: any, groupChat: any) => {
        e.preventDefault();
        console.log("Delete chat", _id, groupChat);
    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <Link
                    to={`/chat/${list?._id}`}
                    onContextMenu={(e) =>
                        handleDeleteChat(e, list?._id, list?.groupChat)
                    }
                >
                    <div
                        className={`flex items-center p-4 gap-4 ${
                            list?.sameSender ? "bg-blue-300" : " bg-yellow-400"
                        } relative`}
                    >
                        {/* Avatar card */}

                        <div className="">
                            <p>{list?.name}</p>
                            {list?.newMessageAlert && (
                                <p>
                                    {list?.newMessageAlert?.count} New Message
                                </p>
                            )}
                        </div>

                        {list?.isOnline && (
                            <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-2 right-2" />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ChatItem;
