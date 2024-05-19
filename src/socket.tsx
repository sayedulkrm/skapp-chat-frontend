import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
export const server = "http://localhost:8000";

const SocketContext = createContext<any>("");

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: any) => {
    const socket = useMemo(() => io(server, { withCredentials: true }), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, useSocket };
