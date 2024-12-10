import { Moment, Duration } from 'moment';

export interface Appointment {
	start: Moment;
	end: Moment;
	bg?: string;
	title?: string;
	id: string | number;
	addClass?: string;
	height?: number;
	top?: number;
	width?: number;
	left?: number;
	opacity?: number;
}

export interface AppointmentsSchedulerProps {
	startTime?: string;
	endTime?: string;
	isHeader?: boolean;
	isDaysNames?: boolean;
	eventDefoultBgColor?: string;
	viewType?: 'week' | 'day';
	scheduleBgClass?: string;
	blockHeight?: number;
	onClickHandler?: (appointment: Appointment) => void;
	appointments?: Appointment[];
	currentDate?: Moment | string;
}

export interface GridsProps {
	appointmentList: Appointment[];
	daysArray: string[];
	startTime: Moment;
	endTime: Moment;
	timesArray: string[];
	totalDuration: Duration;
	blockHeight: number;
	onAppointmentClick?: (appointment: Appointment) => void;
	setAppointmentForCurentDate: (appointments: Appointment[]) => void;
}
