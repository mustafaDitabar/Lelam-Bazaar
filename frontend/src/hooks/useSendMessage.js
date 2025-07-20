import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "../api/axios";

// اگر image به صورت base64 باشه، تبدیلش می‌کنیم به File
function base64ToFile(base64, filename) {
	const arr = base64.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async ({ message, image }) => {
		setLoading(true);

		const formData = new FormData();

		// اگر پیام متنی وجود داشت
		if (message) {
			formData.append("message", message);
		}

		// اگر عکس وجود داشت
		if (image) {
			let imageFile = null;

			if (typeof image === "string" && image.startsWith("data:image")) {
				// base64 => file
				imageFile = base64ToFile(image, "image.png");
			} else if (image instanceof File) {
				imageFile = image;
			}

			if (imageFile) {
				formData.append("image", imageFile);
			}
		}

		const user = JSON.parse(localStorage.getItem("chat-user"));
		const token = user?.accessToken;

		try {
			const res = await axios.post(
				`/api/messages/send/${selectedConversation._id}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						// نیازی به "Content-Type": "multipart/form-data" نیست
					},
				}
			);

			const data = res.data;

			if (data.error) throw new Error(data.error);

			// ✅ پیام برگشتی باید شامل فقط آدرس عکس باشد اگر image ارسال شده
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.response?.data?.error || error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
