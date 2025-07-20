// export function extractTime(dateString) {
// 	const date = new Date(dateString);
// 	const hours = padZero(date.getHours());
// 	const minutes = padZero(date.getMinutes());
// 	return `${hours}:${minutes}`;
// }

// // Helper function to pad single-digit numbers with a leading zero
// function padZero(number) {
// 	return number.toString().padStart(2, "0");
// }

export function extractTime(dateString) {
	const date = new Date(dateString);
	let hours = date.getUTCHours();
	const minutes = padZero(date.getUTCMinutes());

	const ampm = hours < 12 ? "ق.ظ" : "ب.ظ";
	hours = hours % 12;
	hours = hours === 0 ? 12 : hours;
	const formattedHours = padZero(hours);

	return `${formattedHours}:${minutes} ${ampm}`;
}

function padZero(number) {
	return number.toString().padStart(1, "0");
}
