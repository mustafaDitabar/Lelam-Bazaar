import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { auth } = useAuthContext();

	const userId = auth?.userInfo?._id || auth?._id;

	useEffect(() => {
		if (!userId) return;

		const socketInstance = io("http://localhost:3500", {
			auth: { userId },
		});

		setSocket(socketInstance);

		socketInstance.on("connect", () => {
		});

		socketInstance.on("getOnlineUsers", (users) => {
			const ids = users.map((u) => u.userId || u);
			setOnlineUsers(ids);
		});

		socketInstance.on("connect_error", (err) => {
			console.error("❌ خطا در اتصال به Socket.IO:", err.message);
		});

		return () => {
			socketInstance.disconnect();
		};
	}, [userId]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};


// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };
// ;
// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	const { auth } = useAuthContext();
	
	
// 	useEffect(() => {



// 		if (auth && auth._id) {
			
// 			const socket = io("http://localhost:3500", {
				
// 				auth: {
// 					userId: auth._id,
					
// 				},
				
// 			});

// 			socket.on("connect", () => {
				
// 			});
			




// 			setSocket(socket);

// 			// socket.on() is used to listen to the events. can be used both on client and server side
// 			socket.on("getOnlineUsers", (users) => {
// 					console.log("✅ آنلاین‌ها:", users); // این باید در مرورگر لیست userId ها را نشان دهد

// 				setOnlineUsers(users);
// 			});

// 			return () => socket.close();
// 		} else {
// 			if (socket) {
// 				socket.close();
// 				setSocket(null);
// 			}
// 		}
// 	}, [auth]);

// 	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
// };
