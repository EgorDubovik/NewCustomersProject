// Function to parse a time string into a Date object
const parseTimeToDate = (time: string): Date => {
	const now = new Date();
	let hours = 0;
	let minutes = 0;

	// Handle time format "7 am", "7 pm", etc.
	const amPmMatch = time.match(/^(\d{1,2})\s?(am|pm)$/i);
	if (amPmMatch) {
		hours = parseInt(amPmMatch[1]);
		if (amPmMatch[2].toLowerCase() === 'pm' && hours !== 12) {
			hours += 12;
		}
		if (amPmMatch[2].toLowerCase() === 'am' && hours === 12) {
			hours = 0;
		}
	}

	// Handle time format "07:00"
	const hhMmMatch = time.match(/^(\d{1,2}):(\d{2})$/);
	if (hhMmMatch) {
		hours = parseInt(hhMmMatch[1]);
		minutes = parseInt(hhMmMatch[2]);
	}

	const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

	return date;
};

// Function to add hours to a Date object
const addHours = (date: Date, hours: number): Date => {
	const result = new Date(date);
	result.setTime(result.getTime() + hours * 60 * 60 * 1000);
	return result;
};

// Function add weeks to a Date object
const addWeeks = (date: Date, weeks: number): Date => {
	const result = new Date(date);
	result.setTime(result.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
	return result;
};

export { addHours, addWeeks, parseTimeToDate };
