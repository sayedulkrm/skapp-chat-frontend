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

export { fileFormat, transformImage };
