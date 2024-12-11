import { formatDate } from '../../../../helpers/helper';

export const getTimesArray = (start: Date, end: Date, format: string, step: number) => {
	const startClone = new Date(start.getTime());
	const endClone = new Date(end.getTime());
	const timesArray = [];
	if (startClone.getTime() === endClone.getTime()) endClone.setDate(endClone.getDate() + 1);

	while (startClone <= endClone) {
		timesArray.push(formatDate(startClone, format));
		startClone.setHours(startClone.getHours() + step);
	}
	return timesArray;
};

export const getDaysArray = (selectedDay: Date, viewType: string) => {
	const daysArray = [];
	const today = new Date();
	const current = new Date(selectedDay.getTime());
	const dayOfWeek = current.getDay(); // 0 (Sunday) to 6 (Saturday)
	const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust for Sunday being 0
	current.setDate(current.getDate() + diffToMonday);

	// Collect days from Monday to Sunday
	if (viewType === 'day') {
		return [
			{
				title: formatDate(selectedDay, 'DDD DD'),
				isSelect: selectedDay.getFullYear() === today.getFullYear() && selectedDay.getMonth() === today.getMonth() && selectedDay.getDate() === today.getDate(),
			},
		];
	}

	for (let i = 0; i < 7; i++) {
		const day = formatDate(current, 'DDD DD');
		daysArray.push({
			title: day,
			isSelect: current.getFullYear() === today.getFullYear() && current.getMonth() === today.getMonth() && current.getDate() === today.getDate(),
		});
		current.setDate(current.getDate() + 1);
	}

	return daysArray;
};
