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
        id: 666,
        name: "Egypt 2",
        email: "abc231@gmail.com",
        userName: "Azzad",
        content:
            "This is a test case for the Internet Explorer browser that supports Internet Explorer and the Internet Explorer.",

        attachments: [
            "https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg",
        ],

        sender: {
            avatar: "https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg",
            name: "Azzad",
        },
        chat: 234,
        groupChat: 1,

        chatData: {
            name: "Lara Croft Group",
            totalMembers: 2,
            totalMessage: 3452,
        },
    },
];

const chatData = [
    {
        name: "Lara Croft Group",
        totalMembers: 2,
        totalMessage: 3452,
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
        accessorKey: "attachments",
        header: "Attachments",
        minSize: 100,

        cell: (props: any) => {
            return (
                <div className="w-full flex justify-center items-center flex-col gap-5">
                    {props.getValue()?.map((item: any, index: number) => (
                        <img
                            key={index}
                            src={item}
                            alt="image"
                            className="h-24 w-24 rounded-md object-cover"
                        />
                    ))}
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
        accessorKey: "content",
        header: "Content",
        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
        minSize: 300,
    },

    {
        accessorKey: "sender",
        header: "Send By",
        minSize: 100,

        cell: (props: any) => {
            console.log("Hellow am props", props);
            return (
                <div className="w-full flex justify-center items-center flex-col gap-5">
                    <img
                        src={props.getValue().avatar}
                        alt="image"
                        className="h-14 w-14 rounded-full object-cover"
                    />

                    <p className="text-xl">{props.getValue().name}</p>
                </div>
            );
        },
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
        // acc functions have to add
        accessorKey: "groupChat",
        header: "Group Chat",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "totalMembers",
        header: "Total Members",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "totalMessage",
        header: "Total Message",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    {
        accessorKey: "chat",
        header: "Chat",
        minSize: 100,

        cell: (props: any) => {
            return <p>{props.getValue()}</p>;
        },
    },

    // will add time/created at

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

const ChatTable: FC<Props> = () => {
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

    return (
        <div className=" flex w-full h-full flex-col justify-center items-center">
            {/* Search item */}
            <div className="flex w-full  justify-between items-center gap-5 my-5">
                <div className="w-full flex justify- items-center px-5 py-1 bg-[#fff] rounded-xl">
                    <BsSearch className="text-xl text-blue_color" />

                    <input
                        type="text"
                        className="py-2 px-4 bg-transparent w-full"
                        placeholder="Search"
                        value={globalFilter}
                        onChange={(e: any) => setGlobalFilter(e.target.value)}
                    />
                </div>

                <button className="text-blue_color font-semibold bg-white text-black  p-3 rounded-xl hover:text-blue_color_dark duration-200 flex justify-center items-center gap-2">
                    <p>Filter</p>
                    <RiSoundModuleFill className="text-xl" />
                </button>
            </div>

            <div className="h-full w-[800px] flex flex-col gap-10 justify-start items-center bg-white p-8  rounded-3xl ">
                <h1 className=" text-blue_color w-11/12 font-bold text-2xl text-black">
                    List of Chats
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
export default ChatTable;
