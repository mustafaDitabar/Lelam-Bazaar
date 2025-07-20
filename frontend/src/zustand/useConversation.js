// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;


// import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

//   // مکالمه‌ای که باید اول لیست نمایش داده شود
//   prioritizedConversation: null,
//   setPrioritizedConversation: (conversation) => set({ prioritizedConversation: conversation }),
// }));
// export default useConversation;


import { create } from "zustand";

const useConversation = create((set) => ({
	conversations: [],
	setConversations: (conversations) => set({ conversations }),

	users: [],
	setUsers: (users) => set({ users }),

	selectedConversation: null,
	setSelectedConversation: (conv) => set({ selectedConversation: conv }),

	prioritizedConversation: null,
	setPrioritizedConversation: (conv) => set({ prioritizedConversation: conv }),

	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
