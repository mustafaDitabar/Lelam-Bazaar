
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

// const Messages = () => {
// 	const { messages, loading } = useGetMessages();
// 	useListenMessages();

// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

// 			{!loading && messages.length > 0 && messages.map((message) => (
// 				<div key={message._id}>
// 					<Message message={message} />
// 				</div>
// 			))}

// 			{!loading && messages.length === 0 && (
// 				<p dir="ltr" className='text-center text-gray-700 font-bold '>!گفتگو را آغاز کنید</p>
// 			)}
// 		</div>
// 	);
// };

// export default Messages;


import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();

	return (
		<div className="px-4 flex-1 overflow-auto bg-white text-black dark:bg-gray-800 dark:text-white  ">
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id}>
					<Message message={message} />
				</div>
			))}

			{!loading && messages.length === 0 && (
				<p dir="ltr" className="text-center text-gray-700 font-bold">!گفتگو را آغاز کنید</p>
			)}
		</div>
	);
};

export default Messages;


// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

// const Messages = () => {
// 	const { messages, loading } = useGetMessages();
// 	useListenMessages();
// 	const lastMessageRef = useRef();

// 	useEffect(() => {
// 		// اسکرول اتوماتیک به آخرین پیام
// 		if (messages && messages.length > 0) {
// 			setTimeout(() => {
// 				lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 			}, 100);
// 		}
// 	}, [messages]);

// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

// 			{!loading && messages.length > 0 && messages.map((message, index) => (
// 				<div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
// 					<Message message={message} />
// 				</div>
// 			))}

// 			{!loading && messages.length === 0 && (
// 				<p dir="ltr" className='text-center text-gray-700 font-bold '>!گفتگو را آغاز کنید</p>
// 			)}
// 		</div>
// 	);
// };

// export default Messages;
