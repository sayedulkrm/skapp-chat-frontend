import { IoCloseSharp } from "react-icons/io5";
import { setOpenConfirmDeleteGroupBox } from "../../../../redux/chatSlice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const ConfirmDelete = () => {
    const dispatch = useDispatch();

    const { openConfirmDeleteGroupBox } = useSelector(
        (state: RootState) => state.chat
    );

    return (
        <div
            className={
                " fixed overflow-hidden  z-10 bg-gray-900 bg-opacity-70 inset-0 transform ease-in-out" +
                (openConfirmDeleteGroupBox
                    ? " transition-opacity opacity-100 duration-500 translate-y-0  "
                    : " transition-all delay-500 opacity-0 translate-y-full  ")
            }
        >
            <div className="h-full w-full flex justify-center items-center">
                <section
                    className={
                        " w-[600px] h-[400px]  bg-gray-400 dark:bg-slate-800  shadow-xl delay-400 duration-500 ease-in-out overflow-auto transition-all transform rounded-md " +
                        (openConfirmDeleteGroupBox
                            ? " !translate-y-0 "
                            : " translate-y-full ")
                    }
                >
                    <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-5">
                        <div className="w-full">
                            <button
                                className="px-4 py-2 border text-white font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                                onClick={() =>
                                    dispatch(
                                        setOpenConfirmDeleteGroupBox(false)
                                    )
                                }
                            >
                                <IoCloseSharp />
                            </button>
                        </div>

                        {/* =========================== main div  */}

                        <div className="w-full h-full flex justify-center items-center flex-col gap-3">
                            <p className="text-2xl font-bold">
                                Are you sure you want to delete this group?
                            </p>

                            <button className="my-10 px-4 py-2 border text-red-500 font-bold rounded-md text-xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                                Delete
                            </button>
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

export default ConfirmDelete;
