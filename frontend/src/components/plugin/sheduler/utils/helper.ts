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
