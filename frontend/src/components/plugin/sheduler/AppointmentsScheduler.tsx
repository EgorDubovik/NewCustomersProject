import { useEffect, useRef, useState, useMemo } from 'react';
import moment from 'moment';
import Grids from './components/Grids';
import TimesCol from './components/TimesCol';
import { addDays, addWeeks, parseTimeToDate } from './utils/TimeHelper';
import { getAppointmentForCurentDate, getDaysArray, getTimesArray } from './utils/helper';
import DaysRow from './components/DaysRow';
import { use } from 'i18next';
import { formatDate } from '../../../helpers/helper';

interface AppointmentsSchedulerProps {
	startTime?: string;
	endTime?: string;
	blockHeight?: number;
	isDaysNames?: boolean;
	viewType?: 'week' | 'day';
	isHeader?: boolean;
	appointments?: any[];
	// eventDefoultBgColor?: string;
	// viewType?: 'week' | 'day';
	// scheduleBgClass?: string;

	// onClickHandler?: (appointment: any) => void;
	// appointments?: any[];
	// currentDate?: any;
}

const AppointmentsScheduler = (props: AppointmentsSchedulerProps) => {
	const startTime = parseTimeToDate(props.startTime || '00:00');
	const endTime = parseTimeToDate(props.endTime || '23:00');
	const blockHeight = props.blockHeight || 50;
	const viewType = props.viewType || 'week';
	const isHeader = props.isHeader !== undefined ? props.isHeader : true;
	const isDaysNames = props.isDaysNames !== undefined ? props.isDaysNames : true;
	const today = new Date();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const timesArray = getTimesArray(startTime, endTime, 'hh A', 1);
	const daysArray = getDaysArray(selectedDate, viewType);

	const appointmentList = useMemo(() => getAppointmentForCurentDate(props.appointments || [], daysArray[0].date, daysArray[daysArray.length - 1].date), [props.appointments, selectedDate]);
	// const defaultBackgroundColor = props.eventDefoultBgColor || '#1565c0';
	// const endTimeCopy = endTime.clone().add(1, 'hour');
	// const totalDuration = moment.duration(endTimeCopy.diff(startTime));
	// const [daysArray, setDaysArray] = useState<any>([]);
	// const [viewType, setViewType] = useState(props.viewType || 'week'); // week | day
	// const scheduleBgClass = props.scheduleBgClass || 'bg-white dark:bg-gray-800';

	//
	// const onClickHandler = props.onClickHandler || null;
	// const appointments = props.appointments || [];
	// const [currentDate, setCurrentDate] = useState(moment(props.currentDate) || moment());
	// const [appointmentForCurentDate, setAppointmentForCurentDate] = useState([]);

	// useEffect(() => {
	// 	setCurrentDate(moment(props.currentDate));
	// }, [props.currentDate]);

	// const helper = {
	// 	calculateTimePercentage: (time: any) => {
	// 		const relativeTime = time.clone().set({ hour: startTime.hour(), minute: startTime.minute() });
	// 		const elaspseTime = moment.duration(time.diff(relativeTime));
	// 		return (elaspseTime.asMinutes() / totalDuration.asMinutes()) * 100;
	// 	},
	// 	getTimesArray: (interval: number = 60) => {
	// 		const times = [];
	// 		const start = startTime.clone();
	// 		const end = endTime.clone();
	// 		while (start <= end) {
	// 			times.push(start.format('hh A'));
	// 			start.add(interval, 'minutes');
	// 		}
	// 		return times;
	// 	},
	// 	procentToMinutes: function (procent: number) {
	// 		var minutes = Math.round((totalDuration.asMinutes() * procent) / 100);
	// 		return minutes;
	// 	},
	// 	getDaysArray: function () {
	// 		if (viewType === 'week') {
	// 			for (let i = 0; i < 7; i++) {
	// 				daysArray[i] = currentDate.clone().weekday(i).format('ddd') + ' ' + currentDate.clone().weekday(i).format('DD');
	// 			}
	// 		} else if (viewType === 'day') {
	// 			daysArray[0] = currentDate.format('ddd') + ' ' + currentDate.format('DD');
	// 		}
	// 		return daysArray;
	// 	},
	// };

	// const getAppointmentsByCurrentDate = (appointmentsArray: any) => {
	// 	let selectedStartDay = currentDate.clone().startOf('week');
	// 	let selectedEndDay = currentDate.clone().endOf('week');

	// 	let returnAppointments = appointmentsArray.filter((appointment: any) => {
	// 		appointment.start = moment(appointment.start);
	// 		appointment.end = moment(appointment.end);
	// 		appointment.bg = appointment.bg || defaultBackgroundColor;
	// 		return (
	// 			appointment.start.isBetween(selectedStartDay, selectedEndDay) ||
	// 			appointment.end.isBetween(selectedStartDay, selectedEndDay) ||
	// 			(appointment.start.isBefore(selectedStartDay) && appointment.end.isAfter(selectedEndDay))
	// 		);
	// 	});
	// 	let sortedAppointments = returnAppointments.sort((a: any, b: any) => a.start - b.start);
	// 	return sortedAppointments;
	// };

	// const groupAppointmentsByTime = (appointmentsArray: any) => {
	// 	let groups: any = [];
	// 	appointmentsArray.forEach((appointment: any) => {
	// 		const matchingGroup = groups.find((group: any) => appointment.start.isBetween(group.start, group.end, null, '[)') || appointment.end.isBetween(group.start, group.end, null, '(]'));
	// 		if (matchingGroup) {
	// 			matchingGroup.appointments.push(appointment);
	// 		} else {
	// 			groups.push({
	// 				start: appointment.start,
	// 				end: appointment.end,
	// 				appointments: [appointment],
	// 			});
	// 		}
	// 	});
	// 	return groups;
	// };

	// const fetchAppointments = (appointmentsGroup: any) => {
	// 	let returnAppointments: any = [];
	// 	appointmentsGroup.forEach((group: any) => {
	// 		const groupAppointments = group.appointments;
	// 		groupAppointments.forEach((appointment: any, index: number) => {
	// 			appointment.width = 100 / groupAppointments.length;
	// 			appointment.left = appointment.width * index;
	// 			appointment.top = helper.calculateTimePercentage(appointment.start);
	// 			appointment.bottom = helper.calculateTimePercentage(appointment.end);
	// 			appointment.height = appointment.bottom - appointment.top;
	// 			returnAppointments.push(appointment);
	// 		});
	// 	});

	// 	return returnAppointments;
	// };

	// const onAppointmentClick = (appointment: any) => {
	// 	if (onClickHandler) {
	// 		onClickHandler(appointment);
	// 	}
	// };

	// const timesArray = helper.getTimesArray();

	// useEffect(() => {
	// 	let currentAppointments = getAppointmentsByCurrentDate(appointments);

	// 	setAppointmentForCurentDate(currentAppointments);
	// 	setDaysArray(helper.getDaysArray());
	// }, [currentDate, appointments, viewType]);

	// let groupedAppointment = groupAppointmentsByTime(appointmentForCurentDate);
	// let appointmentList = fetchAppointments(groupedAppointment);

	useEffect(() => {
		console.log('selected Date has been changed');
	}, [selectedDate]);

	const prevWeekHandle = () => {
		if (viewType === 'week') setSelectedDate(addWeeks(selectedDate, -1));
		if (viewType === 'day') setSelectedDate(addDays(selectedDate, -1));
	};
	const nextWeekHandle = () => {
		if (viewType === 'week') setSelectedDate(addWeeks(selectedDate, 1));
		if (viewType === 'day') setSelectedDate(addDays(selectedDate, 1));
	};
	const todayHandle = () => {
		setSelectedDate(today);
	};

	return (
		<div className="select-none">
			<div className={'scheduler-container dark:bg-black rounded p-4'}>
				{isHeader && (
					<div className="scheduler-header flex justify-between">
						<div className="scheduler-date text-base">{formatDate(selectedDate, 'MMMM YYYY')}</div>
						<div className="scheduler-nav flex gap-4">
							<button className="btn btn-sm btn-outline btn-outline-primary" onClick={prevWeekHandle}>
								{'<'}
							</button>
							<button className="btn btn-sm btn-outline btn-outline-primary" onClick={todayHandle}>
								Today
							</button>
							<button className="btn btn-sm btn-outline btn-outline-primary" onClick={nextWeekHandle}>
								{'>'}
							</button>
						</div>
					</div>
				)}
				<div className="scheduler-body">
					{isDaysNames && <DaysRow selectedDay={selectedDate} daysArray={daysArray} />}
					<div className="scheduler-dates flex relative">
						<TimesCol timesArray={timesArray} blockHeight={blockHeight} />
						<Grids
							blockHeight={blockHeight}
							startTime={startTime}
							endTime={endTime}
							timesArray={timesArray}
							daysArray={daysArray}
							// appointmentList={appointmentList}
							// setAppointmentForCurentDate={setAppointmentForCurentDate}
							// onAppointmentClick={onAppointmentClick}
							// totalDuration={totalDuration}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentsScheduler;
