import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

	useEffect(() => {
		dispatch(setPageTitle('Schedule'));
	});

	const [loadingStatus, setLoadingStatus] = useState('loading');

	useEffect(() => {
		setLoadingStatus('success');
		setLoadingStatus('loading');

		axiosClient
			.get('/appointment')
			.then((res) => {
				console.log(res.data.appointments);
				setAppointments(res.data.appointments);
				setLoadingStatus('success');
			})
			.catch((err) => {
				setLoadingStatus('error');
				console.log(err);
			});
		const currentDate = searchParams.get('currentDate');
		if (currentDate) {
			setCurrentDate(new Date(currentDate));
		}
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

	const viewAppointments = (id: number) => {
		navigate('/appointment/' + id);
	};

	const onAppointmentClick = (appointment: any) => {
		viewAppointments(appointment.id);
	};

	const onCurrentDateChange = (date: Date) => {
		console.log(date);
		searchParams.set('currentDate', date.toISOString());
		setSearchParams(searchParams);
	};

	const setAppointmentStyle = (appointment: IAppointment) => {
		console.log(appointment);
		let extendedBackgroundStyles = {};
		let extendedTitleStyle = {};
		if (appointment.status === 2) {
			extendedBackgroundStyles = {
				backgroundColor: theme === 'dark' ? '#4a4a4ab0' : '#ccc',
				borderLeft: '3px solid ' + appointment.backgroundColor,
			};
			extendedTitleStyle = {
				color: theme === 'dark' ? '#ffffff' : '#000000',
			};
		}

		return { extendedBackgroundStyles, extendedTitleStyle };
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
						onCurrentDateChange={onCurrentDateChange}
						startTime="07:00"
						endTime="20:00"
						currentDate={currentDate}
						viewType={viewType}
						appointments={appointments}
						onClickHandler={onAppointmentClick}
						setAppointmentStyle={setAppointmentStyle}
					/>
				</div>
			)}
		</div>
	);
};

export default Schedule;
