import moment from "moment";
import { fileFormat } from "./Features/Feature";
import RenderAttachment from "../../../Shared/RenderAttachment";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { memo } from "react";

const MessageComponents = ({ message }: any) => {
    // console.log(message);

    const { user } = useSelector((state: RootState) => state.auth);

    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div className="w-full flex flex-col">
            <div className={`${sameSender ? "self-end" : "self-start"}`}>
                {!sameSender && (
                    <p className="text-cyan-500 font-bold text-lg mb-2">
                        {sender.name}
                    </p>
                )}
                <div
                    className={` py-1 px-2 rounded-md w-fit bg-white text-black `}
                >
                    {content && <p className="mb-2 text-lg">{content}</p>}

                    {/* Attachments */}

                    {attachments.length > 0 &&
                        attachments?.map((item: any, i: number) => {
                            const url = item?.url;

                            const fileType = fileFormat(url);

                            return (
                                <div className="my-4" key={i}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        download={true}
                                        className="text-black "
                                    >
                                        {RenderAttachment(fileType, url)}
                                    </a>
                                </div>
                            );
                        })}
                </div>
            </div>
            <p className="text-sm text-center mt-2 font-medium text-gray-500 w-full flex justify-center items-center ">
                {timeAgo}
            </p>
        </div>
    );
};

export default memo(MessageComponents);
