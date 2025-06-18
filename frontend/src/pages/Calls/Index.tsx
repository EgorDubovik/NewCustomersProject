import { Link } from 'react-router-dom';
import IconAddCall from '../../components/Icon/IconAddCall';
import IconCopy from '../../components/Icon/IconCopy';
import IconPersonAdd from '../../components/Icon/IconPersonAdd';
import IconPhoneForwarded from '../../components/Icon/IconPhoneForwarded';
import IconPhoneMissed from '../../components/Icon/IconPhoneMissed';
import IconPlayCircle from '../../components/Icon/IconPlayCircle';
import IconIncomingCall from '../../components/Icon/InconIncomingCall';
import { useState, useEffect } from 'react';
import axiosClient from '../../store/axiosClient';
import { formatCallDurationText, formatDate } from '../../helpers/helper';
import { useApiRequest } from '../../hooks/useApiRequest';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';

const Calls = () => {
	const [calls, setCalls] = useState([]);
	const { sendRequest, loadingStatus, data } = useApiRequest({
		url: '/calls',
		method: 'get',
	});
	useEffect(() => {
		sendRequest();
	}, []);
	useEffect(() => {
		if (data) {
			setCalls(data);
		}
	}, [data]);
	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="sm:col-span-1 md:col-span-2">
						<div className="flex justify-start items-center gap-2">
							<button className="bg-primary text-white px-4 py-2 rounded">All Calls</button>
							<button className="bg-primary/50 text-white px-4 py-2 rounded flex items-center gap-2">
								<IconIncomingCall className="w-5 h-5" />
								Incoming
							</button>
							<button className="bg-primary/50 text-white px-4 py-2 rounded">Outgoing</button>
							<button className="bg-primary/50 text-white px-4 py-2 rounded">Missed</button>
						</div>
						<div className="list mt-4 flex flex-col gap-2">
							{calls.map((call, index) => (
								<div key={index} className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow">
									<div className="flex items-center gap-2">
										{/* <div
											className={`incoming-call w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center ${
												call.is_missed_call ? 'from-red-500 to-red-600' : call.direction === 'incoming' ? 'from-green-500 to-teal-600' : 'from-blue-500 to-blue-600'
											}`}
										>
											{call.is_missed_call ? (
												<IconPhoneMissed className="w-5 h-5 text-white" />
											) : call.direction === 'incoming' ? (
												<IconIncomingCall className="w-5 h-5 text-white" />
											) : (
												<IconPhoneForwarded className="w-5 h-5 text-white" />
											)}
										</div> */}
										<div
											className={`incoming-call w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center ${
												call.is_missed_call ? 'text-danger' : call.direction === 'incoming' ? 'text-success' : 'text-info'
											}`}
										>
											{call.is_missed_call ? (
												<IconPhoneMissed className="w-8 h-8 text-danger" />
											) : call.direction === 'incoming' ? (
												<IconIncomingCall className="w-8 h-8 text-success" />
											) : (
												<IconPhoneForwarded className="w-8 h-8 text-info" />
											)}
										</div>
										<div className="number ml-2 w-[150px]">
											<p className="dark:text-white text-base flex items-center gap-2">{call.from_number}</p>
										</div>
										<div className="status ml-6 w-[70px]">
											<div className={`text-${call.is_missed_call ? 'danger' : call.direction === 'incoming' ? 'success' : 'info'}`}>{call.is_missed_call ? 'Missed' : call.direction}</div>
											{call.duration_seconds !== 0 && <span className="text-sm">{formatCallDurationText(call.duration_seconds)}</span>}
										</div>

										<div className="date ml-4">
											<p className="text-sm">{formatDate(call.created_at, 'MMM DD YYYY at HH:mm A')}</p>
										</div>
									</div>
									<div className="actions flex items-center gap-4">
										{call.recording_url && (
											<div className="has-audio ml-4">
												<IconPlayCircle className="w-8 h-8  text-primary" />
											</div>
										)}
										<button className="">
											<IconPersonAdd className="w-6 h-6  text-success" />
										</button>
									</div>
								</div>
							))}
							{/* <div className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow">
						<div className="flex items-center gap-2">
							<div className="incoming-call w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
								<IconPhoneForwarded className="w-5 h-5 text-white" />
							</div>
							<div className="number ml-2 w-[150px]">
								<p className="text-base text-primary">
									<Link to="/customer/1">Egor Dubovik</Link>
								</p>
								<p className="text-sm">+1 (234) 567-8901 </p>
							</div>
							<div className="status ml-6 w-[70px] ">
								<p className="text-info ">
									Outgoing
									<p className="">
										<span className="dark:text-white text-sm">5:31 m</span>
									</p>
								</p>
							</div>
							<div className="date ml-4">
								<p className="text-sm">May 25, 2025 10:25 AM </p>
							</div>
						</div>
						<div className="actions flex items-center gap-2">
							<button className="">
								<IconPersonAdd className="w-6 h-6  text-success" />
							</button>
						</div>
					</div>
					<div className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow">
						<div className="flex items-center gap-2">
							<div className="incoming-call w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
								<IconPhoneMissed className="w-5 h-5 text-white" />
							</div>
							<div className="number ml-2 w-[150px]">
								<p className="dark:text-white text-base flex items-center gap-2">+1 (234) 567-8901 </p>
							</div>
							<div className="status ml-6 w-[70px]">
								<p className="text-danger">Missed</p>
							</div>
							<div className="date ml-4">
								<p className="text-sm">May 25, 2025 10:25 AM </p>
							</div>
						</div>
						<div className="actions flex items-center gap-2">
							<button className="">
								<IconPersonAdd className="w-6 h-6  text-success" />
							</button>
						</div>
					</div> */}
						</div>
					</div>
					<div className="panel"></div>
				</div>
			)}
		</div>
	);
};

export default Calls;
