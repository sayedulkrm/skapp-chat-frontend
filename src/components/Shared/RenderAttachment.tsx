import { transformImage } from "../Pages/Chat/MessageComponents/Features/Feature";
import { MdOutlineFileOpen } from "react-icons/md";

type FileType = "video" | "image" | "audio" | "file";

const RenderAttachment = (file: FileType, url: string) => {
    switch (file) {
        case "video":
            return <video src={url} preload="none" width={"200px"} controls />;

        case "image":
            return (
                <img
                    src={transformImage(url, 200)}
                    alt="Attachments"
                    width={"200px"}
                    height={"150px"}
                    className="object-contain"
                />
            );

        case "audio":
            return <audio src={url} preload="none" controls />;

        default:
            return <MdOutlineFileOpen />;
    }
};

export default RenderAttachment;
