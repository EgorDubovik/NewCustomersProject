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
				date: selectedDay,
			},
		];
	}

	for (let i = 0; i < 7; i++) {
		const day = formatDate(current, 'DDD DD');
		daysArray.push({
			title: day,
			isSelect: current.getFullYear() === today.getFullYear() && current.getMonth() === today.getMonth() && current.getDate() === today.getDate(),
			date: new Date(current.getTime()),
		});
		current.setDate(current.getDate() + 1);
	}

	return daysArray;
};

export const getAppointmentForCurentDate = (appointments: any, firstDate: Date, lastDate: Date) => {
	let returnAppointments = appointments.filter((appointment: any) => {
		appointment.start = new Date(appointment.start);
		appointment.end = new Date(appointment.end);
		// appointment.bg = appointment.bg || defaultBackgroundColor;

		return (
			(appointment.start.getTime() >= firstDate.getTime() && appointment.start.getTime() <= lastDate.getTime()) ||
			(appointment.end.getTime() >= firstDate.getTime() && appointment.end.getTime() <= lastDate.getTime()) ||
			(appointment.start.getTime() < firstDate.getTime() && appointment.end.getTime() > lastDate.getTime())
		);
	});
	let sortedAppointments = returnAppointments.sort((a: any, b: any) => a.start - b.start);
	return groupAppointmentsByTime(sortedAppointments);
};

export const groupAppointmentsByTime = (appointmentsArray: any) => {
	let groups: any[] = [];

	appointmentsArray.forEach((appointment: any) => {
		const matchingGroup = groups.find(
			(group: any) =>
				(appointment.start.getTime() >= group.start.getTime() && appointment.start.getTime() < group.end.getTime()) ||
				(appointment.end.getTime() > group.start.getTime() && appointment.end.getTime() <= group.end.getTime())
		);

		if (matchingGroup) {
			matchingGroup.appointments.push(appointment);
		} else {
			groups.push({
				start: appointment.start,
				end: appointment.end,
				appointments: [appointment],
			});
		}
	});

	return groups;
};
