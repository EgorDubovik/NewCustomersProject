import { useEffect, useRef, useState, useMemo } from 'react';
import moment from 'moment';
import Grids from './components/Grids';
import TimesCol from './components/TimesCol';
import { addDays, addWeeks, parseTimeToDate } from './utils/TimeHelper';
import { getAppointmentForCurentDate, getDaysArray, getTimesArray, calculateViewDateTimes, getAppointmentsTiles } from './utils/helper';
import DaysRow from './components/DaysRow';
import { formatDate } from '../../../helpers/helper';
import { AppointmentsSchedulerProps } from './types';

const AppointmentsScheduler = (props: AppointmentsSchedulerProps) => {
	const startTime = useMemo(() => parseTimeToDate(props.startTime || '00:00'), [props.startTime]);
	const endTime = useMemo(() => parseTimeToDate(props.endTime || '23:00'), [props.endTime]);

	const onClickHandler = useMemo(() => props.onClickHandler || null, [props.onClickHandler]); //props.onClickHandler || null;
	const setAppointmentStyle = useMemo(() => props.setAppointmentStyle || null, [props.setAppointmentStyle]);
	const onCurrentDateChange = useMemo(() => props.onCurrentDateChange || null, [props.onCurrentDateChange]);

	const viewType = props.viewType || 'week'; // week | day
	const blockHeight = props.blockHeight || 50;
	const defaultAppointmentOpacity = props.defaultAppointmentOpacity || 0.8;
	const isHeader = props.isHeader !== undefined ? props.isHeader : true;
	const isDaysNames = props.isDaysNames !== undefined ? props.isDaysNames : true;
	const today = new Date();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	useEffect(() => {
		setSelectedDate(props.currentDate ? new Date(props.currentDate) : new Date());
	}, [props.currentDate]);
	// Start view on date Time and end view on date Time
	const [startViewDateTime, setStartViewDateTime] = useState<Date>(new Date());
	const [endViewDateTime, setEndViewDateTime] = useState<Date>(new Date());

	useEffect(() => {
		const result = calculateViewDateTimes(selectedDate, startTime, endTime, viewType);
		if (result) {
			setStartViewDateTime(result.start);
			setEndViewDateTime(result.end);
		}
		if (onCurrentDateChange) onCurrentDateChange(selectedDate);
	}, [selectedDate, startTime, endTime, viewType]);

	const timesArray = getTimesArray(startTime, endTime, 'hh A', 1);
	const daysArray = getDaysArray(selectedDate, viewType);
	const appointmentForCurentDate = useMemo(() => getAppointmentForCurentDate(props.appointments || [], startViewDateTime, endViewDateTime), [props.appointments, startViewDateTime, endViewDateTime]);
	const appointmentTiles = useMemo(() => getAppointmentsTiles(appointmentForCurentDate, startViewDateTime, endViewDateTime), [appointmentForCurentDate]);

	const defaultAppointmentBgColor = props.defaultAppointmentBgColor || '#1565c0';

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
							appointmentTiles={appointmentTiles}
							// appointmentList={appointmentList}
							// setAppointmentForCurentDate={setAppointmentForCurentDate}
							onAppointmentClick={onClickHandler}
							defaultAppointmentOpacity={defaultAppointmentOpacity}
							defaultAppointmentBgColor={defaultAppointmentBgColor}
							setAppointmentStyle={setAppointmentStyle}
							// totalDuration={totalDuration}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentsScheduler;
