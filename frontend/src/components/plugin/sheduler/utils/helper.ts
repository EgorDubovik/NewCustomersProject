import { formatDate } from '../../../../helpers/helper';
import { IAppointment, ITile } from '../types';
export const calculateViewDateTimes = (selectedDate: Date, startTime: Date, endTime: Date, viewType: string) => {
	const getStartOfWeek = (date: Date): Date => {
		const day = date.getDay();
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
		return new Date(date.setDate(diff));
	};

	const setDateTime = (baseDate: Date, time: Date): Date => {
		const newDate = new Date(baseDate);
		newDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
		return newDate;
	};

	if (viewType === 'week') {
		const startOfWeek = getStartOfWeek(selectedDate);
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);

		return {
			start: setDateTime(startOfWeek, startTime),
			end: setDateTime(endOfWeek, endTime),
		};
	} else if (viewType === 'day') {
		return {
			start: setDateTime(selectedDate, startTime),
			end: setDateTime(selectedDate, endTime),
		};
	}
};

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

export const getAppointmentForCurentDate = (appointments: IAppointment[], firstDate: Date, lastDate: Date) => {
	let returnAppointments = appointments.filter((appointment: IAppointment) => {
		appointment.start = new Date(appointment.start);
		appointment.end = new Date(appointment.end);
		// appointment.bg = appointment.bg || defaultBackgroundColor;

		return (
			(appointment.start.getTime() >= firstDate.getTime() && appointment.start.getTime() <= lastDate.getTime()) ||
			(appointment.end.getTime() >= firstDate.getTime() && appointment.end.getTime() <= lastDate.getTime()) ||
			(appointment.start.getTime() < firstDate.getTime() && appointment.end.getTime() > lastDate.getTime())
		);
	});

	let sortedAppointments = returnAppointments.sort((a: any, b: any) => b.start - a.start);

	return sortedAppointments;
};

export const getAppointmentsTiles = (appointments: IAppointment[], startDateTime: Date, endDateTime: Date) => {
	const startDateTimeClone = new Date(startDateTime.getTime());
	const endDateTimeClone = new Date(endDateTime.getTime());
	let returnArray = new Array();
	while (startDateTimeClone.getTime() < endDateTimeClone.getTime()) {
		// Create same Day dateTime but with end time
		const endSameDayTime = new Date(startDateTimeClone.getTime());
		endSameDayTime.setHours(endDateTimeClone.getHours());

		const dayAppointments = appointments.filter((appointment: IAppointment) => {
			const start = typeof appointment.start === 'string' ? new Date(appointment.start) : appointment.start;
			const end = typeof appointment.end === 'string' ? new Date(appointment.end) : appointment.end;

			return (
				(start.getTime() >= startDateTimeClone.getTime() && start.getTime() < endSameDayTime.getTime()) ||
				(end.getTime() > startDateTimeClone.getTime() && end.getTime() <= endSameDayTime.getTime()) ||
				(start.getTime() < startDateTimeClone.getTime() && end.getTime() > endSameDayTime.getTime())
			);
		});

		let tilesForOneDay: ITile[] = [];
		dayAppointments.forEach((appointment: IAppointment) => {
			const { top, height } = calculatePositionAndHeight(startDateTimeClone, endSameDayTime, appointment.start as Date, appointment.end as Date);
			let tile: ITile = {
				// title: appointment.title,
				// id: appointment.id,
				start: appointment.start as Date,
				end: appointment.end as Date,
				appointment: appointment,
				top: top,
				left: null,
				width: null,
				height: height,
				// bg: appointment.bg || '#1565C0',
			};

			tilesForOneDay.push(tile);
		});

		for (let i = 0; i < tilesForOneDay.length; i++) {
			setLeftAndWidth(tilesForOneDay[i], tilesForOneDay);
		}

		for (let i = 0; i < tilesForOneDay.length; i++) {
			setLeftAndWidth(tilesForOneDay[i], tilesForOneDay);
		}

		returnArray.push(tilesForOneDay);
		startDateTimeClone.setDate(startDateTimeClone.getDate() + 1);
	}
	return returnArray;
};
const calculatePositionAndHeight = (startDate: Date, endDate: Date, appointmentStartTime: Date, appointmentEndTime: Date) => {
	const totalDuration = (endDate.getTime() - startDate.getTime()) / 1000 / 60 + 60;
	const startOffset = appointmentStartTime.getTime() < startDate.getTime() ? 0 : (appointmentStartTime.getTime() - startDate.getTime()) / 1000 / 60;
	const endOffset = appointmentEndTime.getTime() > endDate.getTime() ? totalDuration : (appointmentEndTime.getTime() - startDate.getTime()) / 1000 / 60;
	const appointmentDuration = endOffset - startOffset;
	const topPercentage = (startOffset / totalDuration) * 100;
	const heightPercentage = (appointmentDuration / totalDuration) * 100;

	return {
		top: topPercentage,
		height: heightPercentage,
	};
};

const setLeftAndWidth = (tile: any, tiles: any[]) => {
	const overlappingTiles = getOverlapingTiles(tile, tiles);

	if (overlappingTiles.length === 0) {
		tile.left = 0;
		tile.width = 100;
		return;
	}

	const availablePosition = findFirstAvalablePlace(overlappingTiles);

	if (availablePosition) {
		tile.left = availablePosition.left;
		tile.width = availablePosition.width;
	} else {
		// Если все позиции заняты, перераспределяем всех
		overlappingTiles.push(tile);
		const distributedWidth = 100 / overlappingTiles.length;

		overlappingTiles.forEach((tile, index) => {
			tile.left = index * distributedWidth;
			tile.width = distributedWidth;
		});
	}
};

const getOverlapingTiles = (currentTile: ITile, tiles: ITile[]) => {
	return tiles.filter((tile) => {
		// Проверка пересечений по времени
		if (currentTile === tile) return false;
		return (
			(currentTile.start.getTime() >= tile.start.getTime() && currentTile.start.getTime() < tile.end.getTime()) ||
			(currentTile.end.getTime() > tile.start.getTime() && currentTile.end.getTime() <= tile.end.getTime()) ||
			(currentTile.start.getTime() < tile.start.getTime() && currentTile.end.getTime() > tile.end.getTime())
		);
	});
};

const findFirstAvalablePlace = (tiles: ITile[]) => {
	tiles.sort((a, b) => (a.left ?? 0) - (b.left ?? 0));
	let currentLeft = 0;
	for (const tile of tiles) {
		if (tile.left === null) continue;
		if (tile.left > currentLeft) {
			return {
				left: currentLeft,
				width: tile.left - currentLeft,
			};
		}
		currentLeft = Math.max(currentLeft, tile.left + (tile.width ?? 0));
	}

	if (currentLeft < 100) {
		return {
			left: currentLeft,
			width: 100 - currentLeft,
		};
	}
	return null;
};
