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
import IconChecks from '../../components/Icon/IconChecks';
import { getAppointmentColor } from '../../helpers/helper';
import IconMenu from '../../components/Icon/IconMenu';

const Schedule = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [appointments, setAppointments] = useState<any[]>([]);
	const [viewType, setViewType] = useState<'week' | 'day'>('day');
	const theme = useSelector((state: IRootState) => state.themeConfig.theme);
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [openScheduleMenu, setOpenScheduleMenu] = useState(false);
	const [activeAppointments, setActiveAppointments] = useState(0);
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
				console.log('Schedule:', res.data.appointments);
				setAppointments(res.data.appointments);
				setActiveAppointments(res.data.appointments.filter((app: IAppointment) => app.status !== 2).length);
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

	const setAppointmentStyle = (appointment: any) => {
		let extendedBackgroundStyles = {};
		let extendedTitleStyle = {};
		const appointmentColor = getAppointmentColor(appointment);
		extendedBackgroundStyles = {
			backgroundColor: appointmentColor,
		};
		if (appointment.status === 2) {
			extendedBackgroundStyles = {
				backgroundColor: theme === 'dark' ? '#4a4a4ab0' : '#ccc',
				borderLeft: '3px solid ' + appointmentColor,
			};
			extendedTitleStyle = {
				color: theme === 'dark' ? '#ffffff' : '#000000',
			};
		}

		return { extendedBackgroundStyles, extendedTitleStyle };
	};

	return (
		<div className="relative">
			<div
				className={` ${
					openScheduleMenu ? 'block' : 'hidden'
				} transition-opacity duration-300 absolute -top-6 -left-6 w-[250px]  h-full dark:bg-black bg-white z-10 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] `}
			>
				<div className="pt-16">
					<ul className="relative font-semibold space-y-0.5 px-4 pt-4 overflow-y-auto">
						<li className="menu nav-item">
							<a href="/schedule/active/appointments" className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center">
										<IconChecks className="mr-1" />
										Active Appointments
									</div>
									<div className="w-5 h-5 bg-red-500 ml-4 p-2 text-white rounded-full flex items-center justify-center">{activeAppointments}</div>
								</div>
							</a>
						</li>
						<li className="menu nav-item">
							<a href="/schedule/maps/todays" className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center">
										<IconMapPin className="mr-1" />
										Map View
									</div>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div className="flex items-center z-20 cursor-pointer" onClick={() => setOpenScheduleMenu(!openScheduleMenu)}>
					<div className="">
						<IconMenu className="mr-2" />
					</div>
					<h2 className="text-xl">Schedule</h2>
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
