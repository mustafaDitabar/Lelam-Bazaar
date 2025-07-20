// import axios from "../../api/axios";
// import useConversation from "../../zustand/useConversation"; // این را اضافه کن
// import { useAuthContext } from "../../context/AuthContext"; // برای گرفتن اطلاعات کاربر لاگین‌شده

// const Details = ({ product }) => {
//     const { setSelectedConversation } = useConversation();
//     const { auth } = useAuthContext();

//     const accessConversation = async (receiverId) => {
//         const token = auth?.accessToken;

//         try {
//             const { data } = await axios.post("/api/access",
//                 { receiverId },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             console.log("conversation data:", data);

//             const currentUserId = auth?.userInfo?._id;
//             const otherUser = data.participants.find(p => p._id !== currentUserId);
            
//             const conversation = {
//                 _id: otherUser._id,
//                 username: otherUser.username,
//                 photo: otherUser.photo
//             };

//             setSelectedConversation(conversation);

//         } catch (err) {
//             console.error("❌ Error:", err);
//         }
//     }

//     return (
//         <div>
//             <button onClick={() => accessConversation(product.ownerId)}>
//                 چت با فروشنده
//             </button>
//         </div>
//     )
// }

// export default Details;
