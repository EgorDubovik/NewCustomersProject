import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import { useAppointmentContext } from './context/AppointmentContext';
import axiosClient from '../../store/axiosClient';
import CalendarBlock from './CalendarBlock';
import CustomerInfoBlock from './CustomerInfoBlock';
import TechBlock from './TechBlock';
import Images from './Images';
import NotesBlock from './NotesBlock';
import Expense from './Expense';
import ServicesBlock from './ServicesBlock';
import { formatDate } from '../../helpers/helper';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import TimeLine from './TimeLine';
import { canDeleteAppointment } from '../../helpers/gate';

const AppointmentPage = () => {
	const navigate = useNavigate();
	const user = useSelector((state: IRootState) => state.themeConfig.user);
	const [deleteStatus, setDeleteStatus] = useState(false);
	const { appointment, fetchAppointmentData, loadingStatus } = useAppointmentContext();
	const { id } = useParams();
	const cancelAppointment = () => {
		if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
		if (deleteStatus) return;
		setDeleteStatus(true);
		axiosClient
			.delete(`/appointment/${appointment?.id}`)
			.then((res) => {
				if (res.status === 200) {
					navigate('/schedule');
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong');
			})
			.finally(() => {
				setDeleteStatus(false);
			});
	};

	useEffect(() => {
		fetchAppointmentData(parseInt(id || '0'));
	}, [id]);

	return (
		<>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}

			{loadingStatus === 'success' && (
				<>
					<Header />
					<div className="py-4">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-5">
							<div className="grid grid-rows-none gap-5">
								<div className="panel p-4">
									<TimeLine />
								</div>
								<div className="panel p-4 hidden md:block">
									<h3 className="font-semibold text-lg dark:text-white-light">Something new in future</h3>
								</div>
							</div>
							<div className="md:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-5">
								<div className="grid grid-cols-1 gap-5">
									{/* Customer infor */}
									<CustomerInfoBlock />
									{/* Tech for web*/}
									<div className="panel p-4 hidden md:block">
										<TechBlock />
									</div>
									{/* Images for web*/}
									<div className="panel p-0 hidden md:block">
										<Images appointmentId={appointment?.id} />
									</div>
								</div>

								<div className="grid grid-cols-1 gap-5">
									{/* Services */}
									<ServicesBlock />

									{/* Costs */}
									<Expense />

									{/* Notes */}
									<NotesBlock />

									{/* Tech for mobile */}
									<div className="panel p-4 block md:hidden">
										<TechBlock />
									</div>

									{/* Images for mobile*/}
									<div className="panel p-0 block md:hidden">
										<Images appointmentId={appointment?.id} />
									</div>
								</div>
							</div>
						</div>
						{canDeleteAppointment(user) && (
							<div className="text-center mt-6">
								<div className="text-danger cursor-pointer" onClick={cancelAppointment}>
									{deleteStatus ? 'Canceling...' : 'Cancel Appointment'}
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default AppointmentPage;
