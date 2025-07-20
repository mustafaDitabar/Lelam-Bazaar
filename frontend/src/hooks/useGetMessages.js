import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
import axios from "../api/axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {

	
    const getMessages = async () => {
      setLoading(true);
	  
	  const user = JSON.parse(localStorage.getItem("chat-user"));
	  const token = user?.accessToken;


      try {
        const { data } = await axios.get(`/api/messages/${selectedConversation._id}`,
			{
				headers: {
				  Authorization: `Bearer ${token}`
				}
			  }
		);

        if (data.error) throw new Error(data.error);

		console.log("Messages data from server:", data);
		//setMessages(Array.isArray(data.messages) ? data.messages : []);
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error.response?.data?.error || error.message);
        // toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;


//کد قبلییی
// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// //import toast from "react-hot-toast";
// import axios from "../api/axios";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoading(true);
			
			
// try {
// 	const { data } = await axios.get(`/api/messages/${selectedConversation._id}`);

// 	if (data.error) throw new Error(data.error);

// 	setMessages(data);
// } catch (error) {
// 	error(error.response?.data?.error || error.message);
// 			// try {
// 			// 	const res = await fetch(`/api/messages/${selectedConversation._id}`);
// 			// 	const data = await res.json();
// 			// 	if (data.error) throw new Error(data.error);
// 			// 	setMessages(data);
// 			// } catch (error) {
// 				//toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (selectedConversation?._id) getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };
// export default useGetMessages;
