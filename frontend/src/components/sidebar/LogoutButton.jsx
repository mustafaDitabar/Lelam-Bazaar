import useLogout from "../../hooks/useLogout";
import { HiOutlineLogout } from "react-icons/hi";
const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div
					className='flex flex-row-reverse items-center gap-0.5 text-red-400 hover:text-red-500 cursor-pointer'
					onClick={logout}
				>
					<span className="font-semibold">خروج</span>

					<HiOutlineLogout  className='w-6 h-6' />
					
				</div>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};

export default LogoutButton;
