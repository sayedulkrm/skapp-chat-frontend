import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
    setSearchModal,
    setSearchPeople,
} from "../../../../redux/navbarSlice/navbarSlice";
import { useEffect, useState } from "react";
import { useLazySearchUserQuery } from "../../../../redux/navbarSlice/otherApi";

const SearchModals = () => {
    const dispatch = useDispatch();

    const { searchModal, searchPeople } = useSelector(
        (state: RootState) => state.navbar
    );

    const [users, setUsers] = useState<any[]>([]);

    const [searchUser] = useLazySearchUserQuery();

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchUser(searchPeople)
                .then(({ data }) => setUsers(data.users))
                .catch((err) => console.log(err));
        }, 1000);

        // clean up functions
        return () => {
            clearTimeout(timeOutId);
        };
    }, [searchPeople]);

    // async await

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await searchUser(searchPeople);
    //             setUsers(data.users);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     const timeoutId = setTimeout(fetchData, 1000);

    //     return () => clearTimeout(timeoutId);
    // }, [searchPeople]);

    return (
        <div
            className={
                " fixed overflow-hidden  z-10 bg-gray-900 bg-opacity-70 inset-0 transform ease-in-out" +
                (searchModal
                    ? " transition-opacity opacity-100 duration-500 translate-y-0  "
                    : " transition-all delay-500 opacity-0 translate-y-full  ")
            }
        >
            <div className="h-full w-full flex justify-center items-center">
                <section
                    className={
                        " w-[600px] h-[500px]   bg-gray-400 dark:bg-slate-800  shadow-xl delay-400 duration-500 ease-in-out overflow-auto transition-all transform rounded-md " +
                        (searchModal
                            ? " !translate-y-0 "
                            : " translate-y-full ")
                    }
                >
                    <div className="w-full h-auto flex flex-col justify-center items-center p-5 gap-5">
                        <div className="w-full">
                            <button
                                className="px-4 py-2 border text-white font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                onClick={() => dispatch(setSearchModal(false))}
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        <div className="w-full h-full flex flex-col gap-3">
                            <h1 className="text-2xl">Find People</h1>
                            <input
                                type="text"
                                value={searchPeople}
                                placeholder="Enter user name..."
                                className="border-2 focus:border-blue-400 bg-transparent rounded-md text-sm px-4 py-2"
                                onChange={(e) =>
                                    dispatch(setSearchPeople(e.target.value))
                                }
                            />

                            <div className="my-5 w-full h-full max-h-[260px] overflow-y-auto flex flex-col gap-5 scrollhost">
                                {users?.map((user: any) => {
                                    const { name, _id, avatar } = user;

                                    return (
                                        <div
                                            key={_id}
                                            className="flex justify-between items-center gap-5"
                                        >
                                            {/* image */}

                                            <div className="flex justify-center items-center gap-5">
                                                <div className="">
                                                    <img
                                                        src={avatar}
                                                        alt={name}
                                                        className="w-14 h-14 object-cover rounded-full"
                                                    />
                                                </div>

                                                {/* name */}
                                                <div className="flex flex-col justify-start items-start gap-2">
                                                    <h1 className="text-xl line-clamp-1">
                                                        {name}
                                                    </h1>
                                                </div>
                                            </div>

                                            {/* Add friend */}

                                            <button className="w-16 p-2 rounded-md text-sm bg-cyan-500">
                                                Add
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section
                className=" w-screen h-full  cursor-pointer "
                // onClick={() => dispatch(closeCartBox())}
            ></section>
        </div>
    );
};

export default SearchModals;
