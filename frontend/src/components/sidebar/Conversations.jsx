import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";

const Conversations = () => {
	const { loading } = useGetConversations();
	const { conversations, setSelectedConversation } = useConversation();
	const [searchParams] = useSearchParams();
	const conversationId = searchParams.get("conversationId");

	useEffect(() => {
		if (conversationId && conversations.length > 0) {
			const conv = conversations.find(c => c._id === conversationId);
			if (conv) {
				setSelectedConversation(conv);
			}
		}
	}, [conversationId, conversations, setSelectedConversation]);

	if (!conversations || !Array.isArray(conversations)) {
		return <div>هیچ مکالمه‌ای وجود ندارد.</div>;
	}

	return (
		<div className="py-2 flex flex-col overflow-auto bg-white text-black dark:bg-gray-800 dark:text-white  ">
			{conversations.map((conversation) => (
				<div
					key={conversation._id}
					onClick={() => setSelectedConversation(conversation)}
				>
					<Conversation conversation={conversation} />
				</div>
			))}

			{loading ? <span className="loading loading-spinner mx-auto"></span> : null}
		</div>
	);
};

export default Conversations;


// import { useEffect, useRef } from "react";
// import { useSearchParams } from "react-router-dom";  // ✅ اضافه
// import useGetConversations from "../../hooks/useGetConversations";
// import Conversation from "./Conversation";
// import useConversation from "../../zustand/useConversation";

// const Conversations = () => {
//   const { loading } = useGetConversations();
//   const { conversations, setSelectedConversation } = useConversation();  // ✅ setSelectedConversation
//   const lastMessageRef = useRef(null);
//   const [searchParams] = useSearchParams();  // ✅ گرفتن پارامترهای URL
//   const conversationId = searchParams.get("conversationId");  // ✅ گرفتن conversationId از URL

//   // وقتی conversations لود شد و conversationId داریم، آن را انتخاب کن
//   useEffect(() => {
//     if (conversationId && conversations.length > 0) {
//       const conv = conversations.find(c => c._id === conversationId);
//       if (conv) {
//         setSelectedConversation(conv);
//       }
//     }
//   }, [conversationId, conversations, setSelectedConversation]);

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [conversations]);

//   if (!conversations || !Array.isArray(conversations)) {
//     return <div>هیچ مکالمه‌ای وجود ندارد.</div>;
//   }

//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       {conversations.map((conversation, idx) => (
//         <div
//           key={conversation._id}
//           ref={idx === conversations.length - 1 ? lastMessageRef : null}
//         >
//           <Conversation
//             conversation={conversation}
//             lastIdx={idx === conversations.length - 1}
//           />
//         </div>
//       ))}

//       {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
//     </div>
//   );
// };

// export default Conversations;

