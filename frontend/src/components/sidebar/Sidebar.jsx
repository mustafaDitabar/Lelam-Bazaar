import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-l border-gray-300 p-2 bg-white text-black dark:bg-blackbg dark:text-colorwhite   h-[calc(100vh-50px)] flex flex-col' >
			<SearchInput />
			<div className=' px-2'></div>
			<Conversations />
			
		</div>
	);
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
