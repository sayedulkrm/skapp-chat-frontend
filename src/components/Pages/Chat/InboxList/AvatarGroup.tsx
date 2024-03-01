import React from "react";

interface IAvatarGroup {
    avatars: string[];
    isOnline?: boolean;
}

const AvatarGroup: React.FC<IAvatarGroup> = ({ avatars, isOnline }) => {
    return (
        <div className="flex items-center justify-end flex-row-reverse">
            {avatars.slice(0, 4).map((avatar: any, index: number) => (
                <div
                    key={index}
                    className={`relative flex-shrink-0 ${
                        index !== 0 ? "-mr-8" : ""
                    }`}
                >
                    <img
                        src={avatar}
                        alt="Avatar"
                        className={` h-12 w-12 object-cover rounded-full border-2 border-cyan-400 ${
                            index !== 0 ? "relative z-[1]" : ""
                        }`}
                    />
                    {index === 0 && isOnline && (
                        <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0" />
                    )}
                </div>
            ))}
            {avatars.length > 4 && (
                <div className="relative -mr-2">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-400 text-white text-lg font-semibold">
                        +{avatars.length - 4}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
