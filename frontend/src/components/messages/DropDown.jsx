// components/chat/DropDown.jsx
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "../../api/axios";
import useConversation from "../../zustand/useConversation";

const DropDown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		conversations,
		setConversations,
		selectedConversation,
		setSelectedConversation,
	} = useConversation();

	const handleToggle = () => {
		setIsOpen(true);
		setTimeout(() => {
			setIsOpen(false);
		}, 3000);
	};

	const handleDelete = async () => {
		if (!selectedConversation?._id) {
			console.error("❌ conversation ID یافت نشد");
			return;
		}

		try {
			const user = JSON.parse(localStorage.getItem("chat-user"));
			const token = user?.accessToken;

			console.log("💬 selectedConversation (DropDown):", selectedConversation);
			console.log("🧪 آیدی ارسال‌شده به سرور:", selectedConversation._id);

			await axios.delete(`/api/conversations/${selectedConversation._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// 🔁 فیلتر کردن کانورسیشن حذف‌شده
			const updated = conversations.filter(
				(c) => c._id !== selectedConversation._id
			);
			setConversations(updated);

			// اگر گفتگوی انتخاب‌شده حذف شد، ریست کن
			setSelectedConversation(null);
		} catch (error) {
			console.error("❌ خطا در حذف گفتگو:", error);
		}

		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left bg-white text-black dark:bg-gray-800 dark:text-white  ">
			<button onClick={handleToggle} className="px-4 py-2 text-black">
				<FiMoreHorizontal />
			</button>

			{isOpen && (
				<div className="absolute w-24 bg-white border rounded shadow-lg z-50 right-0">
					<ul>
						<li className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-red-500 text-sm space-x-2">
							<button onClick={handleDelete} className="flex items-center">
								<RiDeleteBin6Fill className="w-4 h-4" />
								<span className="ml-1 text-gray-700">حذف</span>
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
