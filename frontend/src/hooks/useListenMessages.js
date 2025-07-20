// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			console.log("📥 New message for toast:", newMessage);
// 			newMessage.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
// 			setMessages([...messages, newMessage]);

// 			// ✅ اگر فرستنده کسی بود که الان باهاش چت باز نیستیم، نوتیف بده
// 			if (!selectedConversation || selectedConversation._id !== newMessage.senderId) {
// 				toast.custom(
// 					(t) => (
// 						<div
// 							className={`${
// 								t.visible ? "animate-enter" : "animate-leave"
// 							} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
// 						>
// 							<div className="flex-1 w-0 p-4">
// 								<div className="flex items-start">
// 									<div className="flex-shrink-0 pt-0.5">
// 										<img className="h-10 w-10 rounded-full" src={newMessage.senderPhoto} alt="" />
// 									</div>
// 									<div className="ml-3 flex-1">
// 										<p className="text-sm font-medium text-gray-900">
// 											{newMessage.senderUsername}
// 										</p>
// 										<p className="mt-1 text-sm text-gray-500">
// 											{newMessage.text}
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 							<div className="flex border-l border-gray-200">
// 								<button
// 									onClick={() => toast.dismiss(t.id)}
// 									className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
// 								>
// 									بستن
// 								</button>
// 							</div>
// 						</div>
// 					),
// 					{ duration: 4000 }
// 				);
// 			}
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages, messages, selectedConversation]);
// };

// export default useListenMessages;


import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, conversations, setConversations, setSelectedConversation } = useConversation();
	const soundRef = useRef(null);

	useEffect(() => {
		// Preload sound
		soundRef.current = new Audio(notificationSound);

		// آماده‌سازی با تعامل کاربر (برای مرورگر)
		const handleUserInteraction = () => {
			soundRef.current.play().catch(() => {});
			soundRef.current.pause();
			soundRef.current.currentTime = 0;
			window.removeEventListener("click", handleUserInteraction);
		};
		window.addEventListener("click", handleUserInteraction);

		return () => {
			window.removeEventListener("click", handleUserInteraction);
		};
	}, []);

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			newMessage.shouldShake = true;
			setMessages(prev => [...prev, newMessage]);

			// صدای نوتیفیکیشن
			if (soundRef.current) {
				soundRef.current.currentTime = 0;
				soundRef.current.play().catch(() => {});
			}

			// آپدیت conversations و بیار مکالمه به بالا
			setConversations(prev => {
				let updated = prev.map(c => {
					if (c._id === newMessage.conversationId) {
						return {
							...c,
							lastMessage: newMessage,
						};
					}
					return c;
				});

				updated.sort((a, b) => {
					if (a._id === newMessage.conversationId) return -1;
					if (b._id === newMessage.conversationId) return 1;
					return 0;
				});

				return updated;
			});

			// انتخاب مکالمه مربوطه
			const conv = conversations.find(c => c._id === newMessage.conversationId);
			if (conv) {
				setSelectedConversation(conv);
			}
		};

		socket?.on("newMessage", handleNewMessage);

		return () => socket?.off("newMessage", handleNewMessage);
	}, [socket, setMessages, setConversations, setSelectedConversation, conversations]);
};

export default useListenMessages;


// import { useEffect } from "react";

// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			newMessage.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
// 			setMessages([...messages, newMessage]);
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages, messages]);
// };
// export default useListenMessages;
