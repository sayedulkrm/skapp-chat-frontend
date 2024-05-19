const fileFormat = (url: any) => {
    const fileExtension = url.split(".").pop();

    if (
        fileExtension === "mp4" ||
        fileExtension === "webm" ||
        fileExtension === "ogg"
    ) {
        return "video";
    }

    if (fileExtension === "mp3" || fileExtension === "wev") {
        return "audio";
    }

    if (
        fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "gif"
    ) {
        return "image";
    }

    return "file";
};

// dpr_auto/w_200

const transformImage = (url: string, width = 200) => {
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

    return newUrl;
};

const getOrSaveFromStorage = ({
    key,
    value,
    get,
}: {
    key: string;
    value?: any;
    get?: boolean;
}) => {
    if (get) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } else {
        // Assuming you might want to save the value as well
        // if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
        // }
    }
};

export { fileFormat, transformImage, getOrSaveFromStorage };
