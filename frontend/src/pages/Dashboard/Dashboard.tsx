import { useEffect, useState } from 'react';
import axiosClient from '../../store/axiosClient';
import { viewCurrency } from '../../helpers/helper';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import DaylyOfWeek from './DaylyOfWeek';
import LastSevenWeeks from './LastSevenWeeks';

const Dashboard = () => {
	const [loadingStatus, setLoadingStatus] = useState<string>('loading');
	const [mainState, setMainState] = useState<any>({
		currentMonth: 0,
		currentWeek: 0,
		today: 0,
		avarage: 0,
	});

	const [daylyOfWeek, setDaylyOfWeek] = useState<any>([]);
	const [lastSevenWeeks, setLastSevenWeeks] = useState<any>([]);

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
				setMainState(newStat);
				setDaylyOfWeek(res.data.daylyForCurrentWeek);
				setLastSevenWeeks(res.data.lastSevenWeeks);
				setLoadingStatus('success');
			})
			.catch((err) => {
				console.log(err);
				setLoadingStatus('error');
			});
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div>
					<div className="pt-4">
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
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
						<DaylyOfWeek series={daylyOfWeek} />

						<LastSevenWeeks series={lastSevenWeeks} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
