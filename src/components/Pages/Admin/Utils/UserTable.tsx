import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillEyeFill, BsSearch } from "react-icons/bs";
import { RiSoundModuleFill } from "react-icons/ri";

type Props = {};

const DummyData = [
    {
        id: 555,
        name: "Elements 1",
        email: "abdsfvc1@gmail.com",
        userName: "Jhonny",

        avatar: "https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max",
        friends: 124,
        groups: 4,
    },

    {
        id: 666,
        name: "Egypt 2",
        email: "abc231@gmail.com",
        userName: "Azzad",

        avatar: "https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg",
        friends: 234,
        groups: 1,
    },
];

const columns = [
    {
        accessorKey: "id",
        header: "ID",
        minSize: 200,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "avatar",
        header: "Avatar",
        minSize: 100,

        cell: (props: any) => {
            return (
                <div className="w-full flex justify-center items-center">
                    <img
                        src={props.getValue()}
                        alt="image"
                        className="h-14 w-14 rounded-full object-cover"
                    />
                </div>
            );
        },
    },

    {
        accessorKey: "email",
        header: "Email",
        minSize: 300,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "name",
        header: "Name",
        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
        minSize: 300,
    },

    {
        accessorKey: "userName",
        header: "User Name",
        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
        minSize: 300,
    },

    {
        accessorKey: "groups",
        header: "Groups",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "friends",
        header: "Friends",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorFn: (row: any) => `${row.id}`,
        header: "Action",
        cell: (props: any) => {
            // console.log("Hellow am props", props.getValue());
            return (
                <div className="w-full h-full flex justify-center gap-5 items-center">
                    <button
                        className=" rounded-md text-xl text-red-400 hover:text-red-700 duration-200"
                        onClick={() => console.log(props.getValue())}
                    >
                        <AiFillDelete />
                    </button>

                    <button className="text-xl text-sky-400 rounded-md  hover:text-sky-600 duration-200 ">
                        <BsFillEyeFill />
                    </button>
                </div>
            );
        },
        minSize: 100,
    },
];

const UserTable: FC<Props> = () => {
    // const [invoiceData, setInvoiceData] = useState(DummyData);

    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: DummyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
            globalFilter: globalFilter,
        },

        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
    });

    console.log(setSorting);

    return (
        <div className=" flex w-full h-full flex-col justify-center items-center">
            {/* Search item */}
            <div className="flex w-full  justify-between items-center gap-5 my-5">
                <div className="w-full flex justify- items-center   bg-[#fff] rounded-xl">
                    <BsSearch className="text-xl text-blue_color" />

                    <input
                        type="text"
                        className="py-3 px-2 bg-transparent w-full text-slate-800"
                        placeholder="Search"
                        value={globalFilter}
                        onChange={(e: any) => setGlobalFilter(e.target.value)}
                    />
                </div>

                <button className="text-blue_color font-semibold bg-white text-slate-800 p-3 rounded-xl hover:text-blue_color_dark duration-200 flex justify-center items-center gap-2">
                    <p>Filter</p>
                    <RiSoundModuleFill className="text-xl" />
                </button>
            </div>

            <div className="h-full w-[800px] flex flex-col gap-10 justify-start items-center bg-white p-8  rounded-3xl ">
                <h1 className=" text-blue_color w-11/12 font-bold text-2xl text-black">
                    List of Users
                </h1>
                {/* React Table */}

                <div className="w-[700px] overflow-y-auto ">
                    <table width={table.getTotalSize()} className={` h-full `}>
                        <thead className={`w-full h-auto `}>
                            {table.getHeaderGroups()?.map((headerGroup) => (
                                <tr
                                    className={`w-full h-full  `}
                                    key={headerGroup.id}
                                >
                                    {headerGroup?.headers?.map((header, i) => (
                                        <th
                                            onClick={header?.column?.getToggleSortingHandler()}
                                            colSpan={header.colSpan}
                                            className={`w-auto h-full cursor-pointer hover:bg-gray-100 duration-200   relative font-normal text-gray-400 ${
                                                i === 0
                                                    ? "text-left"
                                                    : "text-center"
                                            }  `}
                                            key={header.id}
                                        >
                                            {header?.isPlaceholder ? null : (
                                                <div
                                                    className={`w-auto h-full p-3  relative font-normal text-gray-400 ${
                                                        i === 0
                                                            ? "text-left"
                                                            : "text-center "
                                                    }  `}
                                                >
                                                    {flexRender(
                                                        header?.column
                                                            ?.columnDef?.header,
                                                        header.getContext()
                                                    )}

                                                    {{
                                                        asc: " 🔼",
                                                        desc: " 🔽",
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            )}

                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className={` border-red-500  absolute opacity-0 hover:opacity-100 top-0 right-0 h-full w-1 bg-blue_color cursor-col-resize user-select-none touch-action-none rounded-6 ${
                                                    header.column.getIsResizing()
                                                        ? "   hover:bg-green-500 opacity-100"
                                                        : ""
                                                }`}
                                            ></div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody
                            className={`w-full h-full min-h-[100vh] text-black `}
                        >
                            {table.getRowModel()?.rows?.map((row) => (
                                <tr key={row.id} className={` h-auto`}>
                                    {row.getVisibleCells()?.map((cell, i) => (
                                        <td
                                            width={cell.column.getSize()}
                                            key={cell.id}
                                            className={`p-3 border-y text-left h-auto ${
                                                i === 0
                                                    ? "text-left font-semibold"
                                                    : "text-center"
                                            }`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-5 justify-center items-center">
                    <button
                        className="py-2 px-4 text-sm rounded-md bg-blue_color text-white"
                        onClick={() => table.setPageIndex(0)}
                    >
                        First
                    </button>
                    <button
                        disabled={!table.getCanPreviousPage()}
                        className={`py-2 px-4 text-sm rounded-md  text-white ${
                            !table.getCanPreviousPage()
                                ? "bg-blue-300 cursor-not-allowed"
                                : "cursor-pointer bg-blue_color"
                        }`}
                        onClick={() => table.previousPage()}
                    >
                        Prev
                    </button>

                    <p className="py-2 px-4 text-sm rounded-md bg-blue_color text-white">
                        {table.getPageCount()}
                    </p>

                    <button
                        disabled={!table.getCanNextPage()}
                        className={`py-2 px-4 text-sm rounded-md  text-white ${
                            !table.getCanNextPage()
                                ? "bg-blue-300 cursor-not-allowed"
                                : "cursor-pointer bg-blue_color"
                        }`}
                        onClick={() => table.nextPage()}
                    >
                        Next
                    </button>

                    {table.getPageCount() > 1 && (
                        <button
                            className="py-2 px-4 text-sm rounded-md bg-blue_color text-white"
                            onClick={() => table.getPageCount() - 1}
                        >
                            Last
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserTable;
