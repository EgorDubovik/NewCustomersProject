import { Moment, Duration } from 'moment';

export interface IAppointment {
	start: string | Date;
	end: string | Date;
	bg?: string;
	title?: string;
	id: string | number;
	addClass?: string;
	opacity?: number;
	status?: number;
}

export interface AppointmentsSchedulerProps {
	startTime?: string;
	endTime?: string;
	blockHeight?: number;
	isDaysNames?: boolean;
	viewType?: 'week' | 'day';
	isHeader?: boolean;
	appointments?: IAppointment[];
	defaultAppointmentOpacity?: number;
	defaultAppointmentBgColor?: string;
	onClickHandler?: (appointment: IAppointment) => void;
	setAppointmentBackgroundStyle?: (appointment: IAppointment) => void;
}

export interface ITile {
	appointment: IAppointment;
	top: number;
	start: Date;
	end: Date;
	left: number | null;
	width: number | null;
	height: number;
}

export interface GridsProps {
	appointmentList: IAppointment[];
	daysArray: string[];
	startTime: Moment;
	endTime: Moment;
	timesArray: string[];
	totalDuration: Duration;
	blockHeight: number;
	onAppointmentClick?: (appointment: IAppointment) => void;
	// setAppointmentForCurentDate: (appointments: IAppointment[]) => void;
	setAppointmentBackgroundStyle?: (appointment: IAppointment) => void;
	defaultAppointmentOpacity?: number;
	defaultAppointmentBgColor?: string;
}
