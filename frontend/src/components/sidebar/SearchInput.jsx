import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const { setSelectedConversation, setPrioritizedConversation, conversations } = useConversation();
  useGetConversations(); // فقط برای لود شدن مکالمات، نیازی به loading نیست چون auto fetch میشه

  useEffect(() => {
    if (!search) {
      setFilteredConversations([]);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = (conversations || []).filter(
      (c) => c.username && c.username.toLowerCase().includes(lowerSearch)
    );

    setFilteredConversations(filtered);
  }, [search, conversations]);

  const handleSelect = (conversation) => {
    setSelectedConversation(conversation);
    setPrioritizedConversation(conversation);
    setSearch(""); // بعد انتخاب پاک می‌کنیم
    setFilteredConversations([]);
  };

  return (
    <div className="relative w-[240px] bg-white text-black dark:bg-gray-800 dark:text-white  ">
      <input
        dir="rtl"
        type="text"
        placeholder="جستجو ..."
        className="input rounded-md ring-0 p-2 pr-10 w-full h-[40px]
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               border border-transparent bg-gray-200 
               placeholder:text-gray-400 text-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        className="absolute top-1/2 right-2 -translate-y-1/2 text-blue-500 z-10 bg-transparent"
      >
        <IoSearchSharp className="w-5 h-5" />
      </button>

      {/* نتایج جستجو */}
      {search && (
        <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-[200px] overflow-y-auto z-20 shadow-md">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((c) => (
              <li
                key={c._id}
                onClick={() => handleSelect(c)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {c.username}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-400">کاربری یافت نشد</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;


// import { useState } from "react";
// import { IoSearchSharp } from "react-icons/io5";
// import useConversation from "../../zustand/useConversation";
// import useGetConversations from "../../hooks/useGetConversations";
// import toast from "react-hot-toast";

// const SearchInput = () => {
// 	const [search, setSearch] = useState("");
// 	const { setSelectedConversation, setPrioritizedConversation, conversations } = useConversation();
// 	const { loading } = useGetConversations();

// 	const handleSubmit = (e) => {
// 		e.preventDefault();

// 		if (loading) {
// 			return toast.error("Conversations are still loading...");
// 		}

// 		if (!search) return;
// 		if (search.length < 3) {
// 			return toast.error("Search term must be at least 3 characters long");
// 		}

// 		if (!conversations || conversations.length === 0) {
// 			return toast.error("No conversations available.");
// 		}

// 		const lowerSearch = search.toLowerCase();

// 		const conversation = conversations.find(
// 			(c) => c.username && c.username.toLowerCase().includes(lowerSearch)
// 		);

// 		if (conversation) {
// 			setSelectedConversation(conversation);
// 			setPrioritizedConversation(conversation);
// 			setSearch("");
// 		} else {
// 			toast.error("No such user found!");
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="flex items-center gap-2">
// 			<div className="relative w-[240px]">
// 				<input
// 					dir="rtl"
// 					type="text"
// 					placeholder="جستجو ..."
// 					className="input rounded-md ring-0 p-2 pr-10 w-full h-[40px]
// 							focus:outline-none focus:ring-2 focus:ring-blue-500 
// 							border border-transparent bg-gray-200 
// 							placeholder:text-gray-400 text-gray-500"
// 					value={search}
// 					onChange={(e) => setSearch(e.target.value)}
// 				/>
// 				<button
// 					type="submit"
// 					className="absolute top-1/2 right-2 -translate-y-1/2 text-blue-500 z-10 bg-transparent"
// 				>
// 					<IoSearchSharp className="w-5 h-5" />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };

// export default SearchInput;
