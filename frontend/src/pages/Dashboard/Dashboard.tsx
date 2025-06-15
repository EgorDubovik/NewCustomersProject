import { useEffect, useState } from 'react';
import axiosClient from '../../store/axiosClient';
import { viewCurrency } from '../../helpers/helper';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import DaylyOfWeek from './DaylyOfWeek';
import LastSevenWeeks from './LastSevenWeeks';
import IconBarChart from '../../components/Icon/IconBarChart';
import { setShowUpdateWarning } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
	const dispatch = useDispatch();
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const [mainState, setMainState] = useState<any>({
		currentMonth: 0,
		currentWeek: 0,
		today: 0,
		avarage: 0,
	});

	const [daylyOfWeek, setDaylyOfWeek] = useState<any>([]);
	const [lastSevenWeeks, setLastSevenWeeks] = useState<any>([]);
	const [jobsForLast30Days, setJobsForLast30Days] = useState<number | null>(null);
	const [jobsForLastWeek, setJobsForLastWeek] = useState<number | null>(null);
	const [jobsAverageForDay, setJobsAverageForDay] = useState<number | null>(null);

	useEffect(() => {
		// Load data
		setLoadingStatus('loading');
		axiosClient
			.get('/dashboard')
			.then((res) => {
				console.log('data:', res.data);
				const newStat = {
					currentMonth: res.data.mainStat.sumCurrentMonth,
					currentWeek: res.data.mainStat.sumCurrentWeek,
					today: res.data.mainStat.sumCurrentDay,
					avarage: 0,
				};

				console.log('frontend version:', import.meta.env.VITE_APP_VERSION);
				console.log('backend version:', res.data.appVersion);
				if (res.data.appVersion && import.meta.env.VITE_APP_VERSION !== res.data.appVersion) dispatch(setShowUpdateWarning(true));

				setMainState(newStat);
				setDaylyOfWeek(res.data.daylyForCurrentWeek);
				setLastSevenWeeks(res.data.lastSevenWeeks);
				setLoadingStatus('success');
				if (res.data.jobsForLast30Days || res.data.jobsForLast30Days === 0) setJobsForLast30Days(res.data.jobsForLast30Days);
				if (res.data.jobsForLastWeek || res.data.jobsForLastWeek === 0) setJobsForLastWeek(res.data.jobsForLastWeek);
				if (res.data.jobsAverageForDay || res.data.jobsAverageForDay === 0) setJobsAverageForDay(res.data.jobsAverageForDay);
			})
			.catch((err) => {
				console.log(err);
				setLoadingStatus('error');
			});
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="space-y-4 mt-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 text-white">
						{/* Total Today */}
						<div className="panel bg-gradient-to-r from-violet-500 to-violet-400 flex justify-between items-center">
							<div className="text-md font-semibold">Total for today</div>
							<div className="text-3xl font-bold"> {viewCurrency(mainState.today)} </div>
						</div>
						{/* Total for week */}
						<div className="panel bg-gradient-to-r from-blue-500 to-blue-400 flex justify-between items-center">
							<div className="text-md font-semibold">Total for current week</div>
							<div className="text-3xl font-bold"> {viewCurrency(mainState.currentWeek)} </div>
						</div>
						{/* Current month */}
						<div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 flex justify-between items-center">
							<div className="text-md font-semibold">Total for current month</div>
							<div className="text-3xl font-bold"> {viewCurrency(mainState.currentMonth)} </div>
						</div>
						{/* Avarage per day */}
						<div className="panel bg-gradient-to-r from-fuchsia-400 to-fuchsia-300 flex justify-between items-center">
							<div className="text-md font-semibold">Avarage for month</div>
							<div className="text-3xl font-bold"> {viewCurrency(mainState.avarage)} </div>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
						<DaylyOfWeek series={daylyOfWeek} />

						<LastSevenWeeks series={lastSevenWeeks} />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
						{jobsForLast30Days !== null && (
							<div className="panel">
								<div className="flex justify-between items-center">
									<div>
										<div className="text-md font-semibold">Jobs for last 30 days</div>
										<div className="text-2xl font-bold mt-2">{jobsForLast30Days}</div>
									</div>
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
										<IconBarChart className="text-white" />
									</div>
								</div>
							</div>
						)}
						{jobsForLastWeek !== null && (
							<div className="panel">
								<div className="flex justify-between items-center">
									<div>
										<div className="text-md font-semibold">Jobs for last 7 days</div>
										<div className="text-2xl font-bold mt-2">{jobsForLastWeek}</div>
									</div>
									<div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center">
										<IconBarChart className="text-white" />
									</div>
								</div>
							</div>
						)}
						{jobsAverageForDay !== null && (
							<div className="panel">
								<div className="flex justify-between items-center">
									<div>
										<div className="text-md font-semibold">Jobs average per day</div>
										<div className="text-2xl font-bold mt-2">{jobsAverageForDay}</div>
									</div>
									<div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
										<IconBarChart className="text-white" />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
