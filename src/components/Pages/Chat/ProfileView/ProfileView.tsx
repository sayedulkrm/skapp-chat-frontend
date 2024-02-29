import { IoCloseSharp } from "react-icons/io5";
import AvatarGroup from "../InboxList/AvatarGroup";
import moment from "moment";

const ProfileView = () => {
    const activeChat = {
        avatar: [
            "https://pikwizard.com/pw/small/efd4c9d04f7a3555c1bb8699869ace60.jpg",
        ],
        name: "Jhon doe",
        email: "jhon.doe@gmail.com",

        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        isOnline: true,
    };

    const isCartBoxOpen = true;

    return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-70 inset-0 transform ease-in-out" +
                (isCartBoxOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <section
                className={
                    " w-screen max-w-screen-sm md:max-w-lg right-0 absolute bg-gray-400 dark:bg-slate-800 h-full shadow-xl delay-400 duration-500 ease-in-out overflow-auto transition-all transform rounded-xl md:rounded-none rounded-l-none md:rounded-l-2xl " +
                    (isCartBoxOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <div className="w-full h-auto flex justify-start items-start p-5">
                    <button
                        className="px-4 py-2 border text-white font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                        // onClick={() => dispatch(closeCartBox())}
                    >
                        <IoCloseSharp />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col justify-start items-center gap-4">
                    {/* image */}
                    <div className="w-full flex justify-center items-center">
                        <div className="flex items-center justify-end flex-row-reverse">
                            {activeChat?.avatar
                                .slice(0, 4)
                                .map((avatar: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`relative ${
                                            index !== 0 ? "-mr-8" : ""
                                        }`}
                                    >
                                        <img
                                            src={avatar}
                                            alt="Avatar"
                                            className={`h-28 w-28 object-cover rounded-full border-2 border-cyan-400 ${
                                                index !== 0
                                                    ? "relative z-10"
                                                    : ""
                                            }`}
                                        />
                                        {index === 0 &&
                                            activeChat?.isOnline && (
                                                <div className="w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0" />
                                            )}
                                    </div>
                                ))}
                            {activeChat?.avatar.length > 4 && (
                                <div className="relative -ml-4">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-400 text-white text-lg font-semibold">
                                        +{activeChat?.avatar.length - 4}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* name */}
                    <h1 className="text-2xl">{activeChat?.name}</h1>
                    <p className="text-sm">@asdeefh</p>

                    {/* Bio */}

                    <div className="w-full flex justify-center items-center gap-4">
                        <p>Joined On</p>
                        {moment("2023-11-04T18:00:00.000Z").fromNow()}
                    </div>
                </div>
            </section>
            <section
                className=" w-screen h-full  cursor-pointer "
                // onClick={() => dispatch(closeCartBox())}
            ></section>
        </main>
    );
};

export default ProfileView;
