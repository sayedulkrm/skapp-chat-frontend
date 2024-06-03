import { Link, useSearchParams } from "react-router-dom";
import AvatarGroup from "../Chat/InboxList/AvatarGroup";
import { memo } from "react";
import { useMyGroupChatsQuery } from "../../../redux/api/apiSlice";

const GroupsList = () => {
    const chatId = useSearchParams()[0].get("group");

    console.log(chatId);

    const myGroups = useMyGroupChatsQuery("");

    return (
        <div className="w-full h-full">
            {myGroups?.data?.groups?.length > 0 ? (
                myGroups?.data?.groups?.map((item: any) => {
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

const GroupListItem = memo(({ group, chatId }: any) => {
    const { name, avatar, _id } = group;

    console.log(group);

    // console.log("am from listitem", chatId);

    return (
        <Link
            onClick={(e) => {
                if (chatId === _id) {
                    e.preventDefault();
                }
            }}
            to={`?group=${_id}`}
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
});

export default GroupsList;
