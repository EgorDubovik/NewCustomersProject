import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import AppointmentsScheduler from '../../components/plugin/sheduler/AppointmentsScheduler';
import axiosClient from '../../store/axiosClient';
import { IRootState } from '../../store';
import { PageLoadError } from '../../components/loading/Errors';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import IconMapPin from '../../components/Icon/IconMapPin';
import { IAppointment } from '../../components/plugin/sheduler/types';

const Schedule = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [appointments, setAppointments] = useState<any[]>([]);
	const [viewType, setViewType] = useState<'week' | 'day'>('day');
	const theme = useSelector((state: IRootState) => state.themeConfig.theme);

	useEffect(() => {
		dispatch(setPageTitle('Schedule'));
	});

	const [loadingStatus, setLoadingStatus] = useState('loading');

	const refactorAppointments = (appointments: any) => {
		const getTextColor = (appointment: any) => {
			let bgColor = theme === 'dark' ? '#ffffff29' : '#ccc';
			bgColor = appointment.status == 0 ? appointment.bg : bgColor;
			let textColor = appointment.status === 0 ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-500';
			return { bgColor, textColor };
		};

		const appointmentList = appointments.map((appointment: any) => {
			const { bgColor, textColor } = getTextColor(appointment);
			return {
				id: appointment.id,
				title: appointment.title,
				start: appointment.start,
				end: appointment.end,
				status: appointment.status,
				bg: bgColor,
				addClass: textColor,
			};
		});
		setAppointments(appointmentList);
	};

	useEffect(() => {
		// refactorAppointments(appointments);
	}, [theme]);

	useEffect(() => {
		setLoadingStatus('success');
		setLoadingStatus('loading');
		setAppointments([
			{
				title: 'App 1',
				start: '2025-01-29T10:00:00',
				end: '2025-01-29T12:00:00',
				status: 1,
				bg: '#1565C0',
			},
			{
				title: 'App 2',
				start: '2025-01-29T11:00:00',
				end: '2025-01-29T13:00:00',
				status: 0,
				bg: '#1565C0',
			},
			{
				title: 'App 2',
				start: '2025-01-29T11:00:00',
				end: '2025-01-29T14:00:00',
			},
			{
				title: 'App 2',
				start: '2025-01-29T13:00:00',
				end: '2025-01-29T15:00:00',
			},
			{
				title: 'App 2',
				start: '2025-01-29T08:00:00',
				end: '2025-01-29T11:00:00',
			},
			{
				title: 'App 2',
				start: '2025-01-29T08:00:00',
				end: '2025-01-29T11:00:00',
			},
		]);
		setLoadingStatus('success');
		// axiosClient
		// 	.get('/appointment')
		// 	.then((res) => {
		// 		refactorAppointments(res.data.appointments);
		// 		setLoadingStatus('success');
		// 	})
		// 	.catch((err) => {
		// 		setLoadingStatus('error');
		// 		console.log(err);
		// 	});
	}, []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setViewType('day');
			} else {
				setViewType('week');
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const viewAppointments = (data: any) => {
		navigate('/appointment/' + data.id);
	};

	const onAppointmentClick = (data: any) => {
		console.log(data);
	};
	const setAppointmentBackgroundStyle = (appointment: IAppointment) => {
		if (appointment.status === 1)
			return {
				backgroundColor: theme === 'dark' ? '#5b5b5b' : '#ccc',
				borderLeft: '3px solid ' + appointment.bg,
			};
	};

	return (
		<div>
			<div className="flex items-center justify-between flex-wrap gap-4">
				<h2 className="text-xl">Schedule</h2>
				<div className="flex gap-2 md:justify-end justify-around mb-2">
					<div className="flex-auto md:flex-none ">
						<Link to="/schedule/maps/todays" className="flex items-center ">
							<IconMapPin className="mr-1" />
							Map View
						</Link>
					</div>
				</div>
			</div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="py-4">
					<AppointmentsScheduler
						startTime="07:00"
						endTime="20:00"
						viewType={viewType}
						appointments={appointments}
						onClickHandler={onAppointmentClick}
						setAppointmentBackgroundStyle={setAppointmentBackgroundStyle}
					/>
				</div>
			)}
		</div>
	);
};

export default Schedule;
