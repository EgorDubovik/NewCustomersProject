import { createContext, useContext, useState, ReactNode } from 'react';
import { IPayment, ITech, INote, IAppointment, ITag } from '../../../types';
import axiosClient from '../../../store/axiosClient';
import moment from 'moment';
import { calculateRemaining, calculateTaxAndTotal, calculateTotalPaid } from '../../../helpers/helper';
import { useSelector } from 'react-redux';

interface AppointmentContextType {
	appointment: IAppointment | null;
	setAppointment: (appointment: IAppointment | null) => void;
	updateStatus: (status: number) => void;
	updateNotes: (notes: INote[]) => void;
	updatePayments: (payments: IPayment[]) => void;
	updateServices: (services: any[]) => void;
	updateTime: (start: string, end: string) => void;
	updateImages: (images: any[]) => void;
	updateTechs: (techs: ITech[]) => void;
	fetchAppointmentData: (id: number) => void;
	updateTags: (tags: ITag[]) => void;
	loadingStatus: string;
}

const AppointmentContext = createContext<AppointmentContextType | null>(null);

const useAppointmentContext = () => {
	const context = useContext(AppointmentContext);
	if (!context) {
		throw new Error('useAppointmentContext must be used within an AppointmentProvider');
	}
	return context;
};

// Appointment provider component
const AppointmentProvider = ({ children, appointmentData }: { children: ReactNode; appointmentData: IAppointment | null }) => {
	const [appointment, setAppointment] = useState<IAppointment | null>(appointmentData);
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const taxRate = useSelector((state: any) => state.themeConfig.companySettings.taxRate);
	const updateStatus = (status: number) => {
		if (appointment) {
			setAppointment({ ...appointment, status: status });
		}
	};
	const updateNotes = (notes: INote[]) => {
		if (appointment) {
			setAppointment({ ...appointment, notes: notes });
		}
	};

	const updatePayments = (payments: IPayment[]) => {
		if (appointment) {
			const updatedJob = {
				...appointment.job,
				payments: payments,
				total_paid: calculateTotalPaid(payments),
				remaining_balance: calculateRemaining(payments, appointment.job.total_amount),
			};
			setAppointment({ ...appointment, job: updatedJob });
		}
	};
	const updateServices = (services: any[]) => {
		if (appointment) {
			const { tax, total } = calculateTaxAndTotal(services, taxRate);
			const updatedJob = {
				...appointment.job,
				services: services,
				total_amount: total,
				total_tax: tax,
				remaining_balance: calculateRemaining(appointment.job.payments, total),
			};
			setAppointment({ ...appointment, job: updatedJob });
		}
	};

	const updateTime = (start: string, end: string) => {
		if (appointment) {
			// Update the top-level appointment times
			const updatedAppointment = {
				...appointment,
				start: start,
				end: end,
				job: {
					...appointment.job,
					appointments: appointment.job.appointments.map(
						(jobAppointment: IAppointment) =>
							jobAppointment.id === appointment.id
								? { ...jobAppointment, start: start, end: end } // Update matching job appointment
								: jobAppointment // Keep others unchanged
					),
				},
			};

			// Set the updated appointment in context
			setAppointment(updatedAppointment);
		}
	};
	const updateImages = (images: any[]) => {
		if (appointment) {
			setAppointment({ ...appointment, images: images });
		}
	};
	const updateTechs = (techs: ITech[]) => {
		if (appointment) {
			setAppointment({ ...appointment, techs: techs });
		}
	};

	const updateTags = (tags: ITag[]) => {
		if (appointment) {
			setAppointment({ ...appointment, job: { ...appointment.job, tags: tags } });
		}
	};

	const fetchAppointmentData = (id: number) => {
		setLoadingStatus('loading');
		console.log('fetching appointment');
		axiosClient
			.get(`/appointment/${id}`)
			.then((res) => {
				console.log(res.data);
				let appointment = res.data.appointment;
				setAppointment(appointment);

				setLoadingStatus('success');
			})
			.catch((err) => {
				console.log(err);
				setLoadingStatus('error');
			});
	};

	const value: AppointmentContextType = {
		appointment,
		setAppointment,
		updateStatus,
		updateNotes,
		updatePayments,
		updateServices,
		updateTime,
		updateImages,
		updateTechs,
		fetchAppointmentData,
		loadingStatus,
		updateTags,
	};

	return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export { AppointmentContext, useAppointmentContext, AppointmentProvider };
