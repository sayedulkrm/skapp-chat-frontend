import { Link, useSearchParams } from "react-router-dom";
import AvatarGroup from "../Chat/InboxList/AvatarGroup";

const GroupsList = () => {
    const chatId = useSearchParams()[0].get("group");

    console.log(chatId);

    const myGroups: any[] = [
        {
            _id: 122,
            avatar: [
                "https://pikwizard.com/pw/small/efd4c9d04f7a3555c1bb8699869ace60.jpg",
                "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
                "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
                "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
                "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
                "https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg",
            ],
            name: "My group",
            lastMessage: "Hello, How are you?",
            groupChat: false,
            members: ["234", "432"],
            isOnline: true,
            sameSender: false,
        },
    ];

    return (
        <div className="w-full h-full">
            {myGroups?.length > 0 ? (
                myGroups?.map((item) => {
                    return (
                        <GroupListItem
                            group={item}
                            chatId={chatId}
                            key={item?._id}
                        />
                    );
                })
            ) : (
                <p>No Group list avaiable</p>
            )}
        </div>
    );
};

const GroupListItem = ({ group, chatId }: any) => {
    const { name, avatar, _id } = group;

    console.log("am from listitem", chatId);

    return (
        <Link
            to={`?group=${_id}`}
            onClick={(e) => {
                if (chatId === _id) {
                    return e.preventDefault();
                }
            }}
            className="w-full  flex justify-center items-center py-4 border-b border-gray-200 dark:border-gray-700"
        >
            <div
                className={`min-w-[6rem] flex justify-start items-center rounded-full mr-4 relative `}
            >
                <AvatarGroup avatars={avatar} />
            </div>

            <div className="flex-1 ">
                <div className="mb-2 text-base line-clamp-1">{name}</div>

                {/* <div className=" text-sm line-clamp-1">
            {lastMessage}
        </div> */}
            </div>
        </Link>
    );
};

export default GroupsList;
