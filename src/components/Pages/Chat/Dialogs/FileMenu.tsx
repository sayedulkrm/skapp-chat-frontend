import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAttachmentLoader,
    setOpenAttachmentDialogBox,
} from "../../../../redux/chatSlice/chatSlice";
import {
    AiOutlineFile,
    AiOutlineAudio,
    AiOutlineVideoCamera,
    AiOutlinePicture,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { RootState } from "../../../../redux/store";
import SpinLoader from "../../../Layout/Loader/SpinLoader";
import { useSendAttachmentsMutation } from "../../../../redux/chatSlice/chatApi";
import { useParams } from "react-router-dom";

// video 03:44:44

const FileMenu = () => {
    const dispatch = useDispatch();
    const { attachmentLoader } = useSelector((state: RootState) => state.chat);

    const [sendAttachments] = useSendAttachmentsMutation();

    const params = useParams();
    const chatId = params.chatId;

    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [fileType, setFileType] = useState<any>(null);

    const handleFileChange = async (e: any, key: any) => {
        const files = Array.from(e.target.files);

        if (files.length <= 0) {
            return;
        }

        if (files.length > 5) {
            return toast.error(`You can only sent 5 ${fileType} at a time`);
        }

        dispatch(setAttachmentLoader(true));

        // setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
        const toastId = toast.loading(`Sending ${key}...`);

        try {
            // Create FormData and append data
            const myForm = new FormData();
            if (chatId) {
                myForm.append("chatId", chatId);
            } else {
                return toast.error("Chat ID is not available");
            }

            files.forEach((file: any) => {
                myForm.append("files", file);
            });

            // Make the API call
            const res: any = await sendAttachments(myForm);
            console.log("Response:", res);

            // Check the response and show appropriate toast
            if (res?.data) {
                toast.success(`Successfully sent ${key}`, { toastId });
            } else {
                toast.error(`Failed to send ${key}`, { toastId });
            }
        } catch (error: any) {
            // Handle API call error
            console.error("API call error:", error);
            toast.error("Failed to send attachment", { toastId });
        } finally {
            // Always dispatch after API call
            dispatch(setAttachmentLoader(false));
            toast.dismiss(toastId);
        }
    };

    const handleUpload = () => {
        // Here you can perform the upload logic for each file, such as sending them to a server
        selectedFiles.forEach((file: any) => {
            console.log("Uploading file:", file);
        });
        // Reset selected files after upload
        setSelectedFiles([]);
    };

    const handleColse = () => {
        dispatch(setOpenAttachmentDialogBox(false));
    };

    const handleFileType = (type: any) => {
        setFileType(type);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        setSelectedFiles([...selectedFiles, ...Array.from(droppedFiles)]);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleBrowseFiles = () => {
        document?.getElementById("fileInput")!.click();
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-800 w-80 h-96 rounded-md p-1 overflow-y-auto z-[2]">
            <div className="w-full flex justify-end items-center">
                <button className="p-1 text-2xl" onClick={handleColse}>
                    <IoClose />
                </button>
            </div>
            {attachmentLoader ? (
                <SpinLoader />
            ) : (
                <>
                    <div className="mt-4 flex justify-center items-center space-x-4">
                        <button
                            className="flex flex-col items-center focus:outline-none"
                            onClick={() => handleFileType("attachment")}
                        >
                            <AiOutlineFile className="text-4xl" />
                            <span>Attachment</span>
                        </button>
                        <button
                            className="flex flex-col items-center focus:outline-none"
                            onClick={() => handleFileType("audio")}
                        >
                            <AiOutlineAudio className="text-4xl" />
                            <span>Audio</span>
                        </button>
                        <button
                            className="flex flex-col items-center focus:outline-none"
                            onClick={() => handleFileType("video")}
                        >
                            <AiOutlineVideoCamera className="text-4xl" />
                            <span>Video</span>
                        </button>
                        <button
                            className="flex flex-col items-center focus:outline-none"
                            onClick={() => handleFileType("image")}
                        >
                            <AiOutlinePicture className="text-4xl" />
                            <span>Picture</span>
                        </button>
                    </div>
                    {fileType && (
                        <div className="mt-4 flex flex-col items-center p-2">
                            <div
                                className="w-full h-40 border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                                onClick={handleBrowseFiles}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <p className="text-gray-400">
                                    Click here to select or drop {fileType}
                                </p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={(e) =>
                                        handleFileChange(e, fileType)
                                    }
                                    className="hidden"
                                    multiple
                                    accept={
                                        fileType === "audio"
                                            ? "audio/mp3,audio/wav"
                                            : fileType === "video"
                                            ? "video/*"
                                            : fileType === "image"
                                            ? "image/*"
                                            : ""
                                    }
                                />
                            </div>
                            {selectedFiles.length > 0 && (
                                <div className="mt-2">
                                    <h3>Selected Files:</h3>
                                    <ul className="list-disc">
                                        {selectedFiles.map(
                                            (file: any, index: number) => (
                                                <li key={index}>{file.name}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleUpload}
                                disabled={selectedFiles.length === 0}
                            >
                                Upload
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FileMenu;
