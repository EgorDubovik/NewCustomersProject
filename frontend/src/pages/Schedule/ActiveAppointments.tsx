import { useEffect, useState } from 'react';
import axiosClient from '../../store/axiosClient';
import { IAppointment } from '../../types';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { Link } from 'react-router-dom';
import { formatDate, getAppointmentColor, viewCurrency } from '../../helpers/helper';
import IconCalendar from '../../components/Icon/IconCalendar';

const ActiveAppointments = () => {
	const [activeAppointments, setActiveAppointments] = useState<IAppointment[]>([]);
	const [loadingStatus, setLoadingStatus] = useState('loading');
	useEffect(() => {
		setLoadingStatus('loading');
		axiosClient
			.get('/appointment/active')
			.then((res) => {
				console.log('Active appointments:', res.data);
				if (res.data.appointments) {
					setActiveAppointments(res.data.appointments);
				}
				setLoadingStatus('success');
			})
			.catch((err) => {
				console.log(err);
				setLoadingStatus('error');
			});
	}, []);

	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="py-4">
					<div className="container w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-8">
						<div className="panel">
							<div className="text-md my-2">Active Appointments ({activeAppointments.length})</div>
							{activeAppointments.map((appointment: IAppointment, index: number) => (
								<Link to={`/appointment/${appointment.id}`} key={index}>
									<div
										className="p-2 shadow bg-[#f4f4f4] dark:bg-white-dark/20 rounded border-l-2 mb-3"
										style={{
											borderColor: getAppointmentColor(appointment),
										}}
									>
										<div className="px-4 flex items-center justify-between">
											<div className="min-w-0 flex-1">
												<p className="font-bold dark:text-gray-300">{appointment.job?.services[0]?.title}</p>
												<p className="whitespace-nowrap overflow-hidden text-ellipsis">{appointment.job?.services[0]?.description}</p>
											</div>
											<div className={`text-${appointment.job?.remaining_balance > 0 ? 'danger' : 'success'} text-center text-[12px]`}>
												{viewCurrency(appointment.job?.remaining_balance > 0 ? appointment.job?.remaining_balance : appointment.job?.total_paid)}
											</div>
										</div>
										<div className="flex items-center justify-between px-4 mt-2">
											<div className="flex items-center">
												<IconCalendar className="w-4 h-4" />
												<span className="ml-2">{formatDate(appointment.start, 'MMM DD, YYYY')}</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ActiveAppointments;
