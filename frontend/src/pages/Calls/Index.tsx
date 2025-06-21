import { Link, useNavigate } from 'react-router-dom';
import IconPersonAdd from '../../components/Icon/IconPersonAdd';
import IconPhoneForwarded from '../../components/Icon/IconPhoneForwarded';
import IconPhoneMissed from '../../components/Icon/IconPhoneMissed';
import IconPlayCircle from '../../components/Icon/IconPlayCircle';
import IconIncomingCall from '../../components/Icon/InconIncomingCall';
import { useState, useEffect, useRef } from 'react';
import { formatCallDurationText, formatDate } from '../../helpers/helper';
import { useApiRequest } from '../../hooks/useApiRequest';
import { PageCirclePrimaryLoader } from '../../components/loading/PageLoading';
import { PageLoadError } from '../../components/loading/Errors';
import { ICall } from './type';
import CallInfo from './CallInfo';
import { Pagination, Select } from '@mantine/core';
import IconSettings from '../../components/Icon/IconSettings';

const Calls = () => {
	const [calls, setCalls] = useState<ICall[]>([]);
	const [selectedCall, setSelectedCall] = useState<ICall | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [status, setStatus] = useState<'all' | 'incoming' | 'outgoing' | 'missed'>('all');
	const { sendRequest, loadingStatus, data } = useApiRequest({
		url: '/calls',
		method: 'get',
		params: {
			page,
			per_page: perPage,
			status,
		},
	});

	const navigate = useNavigate();
	const height = 30;
	const barCount = 60;

	const bars = useRef<number[]>([]);

	useEffect(() => {
		sendRequest();
	}, [perPage, page, status]);

	useEffect(() => {
		console.log(data);
		if (data) {
			setCalls(data.data);
			setTotalPages(data.last_page);
		}
	}, [data]);

	useEffect(() => {
		if (selectedCall) {
			bars.current = Array.from({ length: barCount }, () => Math.floor(Math.random() * height));
		}
	}, [selectedCall]);

	const createCustomer = (phoneNumber: string) => {
		navigate('/customers/create?phone=' + phoneNumber);
	};
	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="sm:col-span-1 md:col-span-2">
							<div className="flex justify-between items-center gap-2">
								<div className="flex items-center gap-2">
									<button className={`text-white px-4 py-2 rounded ${status === 'all' ? 'bg-primary' : 'bg-primary/50'}`} onClick={() => setStatus('all')}>
										All Calls
									</button>
									<button className={`text-white px-4 py-2 rounded flex items-center gap-2 ${status === 'incoming' ? 'bg-primary' : 'bg-primary/50'}`} onClick={() => setStatus('incoming')}>
										<IconIncomingCall className="w-5 h-5" />
										Incoming
									</button>
									<button className={`text-white px-4 py-2 rounded flex items-center gap-2 ${status === 'outgoing' ? 'bg-primary' : 'bg-primary/50'}`} onClick={() => setStatus('outgoing')}>
										<IconPhoneForwarded className="w-5 h-5" />
										Outgoing
									</button>
									<button className={`text-white px-4 py-2 rounded flex items-center gap-2 ${status === 'missed' ? 'bg-primary' : 'bg-primary/50'}`} onClick={() => setStatus('missed')}>
										<IconPhoneMissed className="w-5 h-5" />
										Missed
									</button>
								</div>
								<Link to="/calls/settings" className="flex items-center gap-2 hover:text-primary">
									<IconSettings className="w-5 h-5" />
									Settings
								</Link>
							</div>
							<div className="list mt-4 flex flex-col gap-2">
								{calls.map((call, index) => (
									<div key={index} className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow cursor-pointer" onClick={() => setSelectedCall(call)}>
										<div className="flex items-center gap-2">
											<div
												className={`incoming-call w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center ${
													call.is_missed_call ? 'text-danger' : call.direction === 'incoming' ? 'text-success' : 'text-info'
												}`}
											>
												{call.is_missed_call ? (
													<IconPhoneMissed className="w-6 h-6 text-danger" />
												) : call.direction === 'incoming' ? (
													<IconIncomingCall className="w-6 h-6 text-success" />
												) : (
													<IconPhoneForwarded className="w-6 h-6 text-info" />
												)}
											</div>
											<div className="number ml-2 w-[150px]">
												{call.customer ? (
													<>
														<Link className="text-base text-primary flex items-center gap-2" to={`/customer/${call.customer.id}`}>
															{call.customer.name}
														</Link>
														<p className="dark:text-gray-400 text-gray-500 text-sm flex items-center gap-2">{call.from_number}</p>
													</>
												) : (
													<p className="dark:text-white text-base flex items-center gap-2">{call.from_number}</p>
												)}
											</div>
											<div className="status ml-6 w-[70px]">
												<div className={`text-${call.is_missed_call ? 'danger' : call.direction === 'incoming' ? 'success' : 'info'}`}>
													{call.is_missed_call ? 'Missed' : call.direction[0].toUpperCase() + call.direction.slice(1)}
												</div>
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

											{!call.customer && (
												<button className="" onClick={() => createCustomer(call.direction === 'incoming' ? call.from_number : call.to_number)}>
													<IconPersonAdd className="w-6 h-6  text-success" />
												</button>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="panel ">{selectedCall && <CallInfo selectedCall={selectedCall} setSelectedCall={setSelectedCall} />}</div>
					</div>
					<div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 mt-4 rounded-md">
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-2">
								<Select
									value={perPage.toString()}
									onChange={(e) => {
										setPerPage(Number(e?.valueOf() || 10));
										setPage(1);
									}}
									placeholder="Per page"
									className="w-20 h-8"
									classNames={{
										input: 'bg-white dark:bg-gray-900 dark:text-white text-black border border-gray-300 dark:border-gray-700',
										dropdown: 'bg-white dark:bg-gray-900 dark:text-white text-black border border-gray-300 dark:border-gray-700',
										item: 'bg-white dark:bg-gray-900 dark:text-white text-black hover:bg-gray-100 dark:hover:bg-gray-800',
									}}
									data={[
										{ value: '10', label: '10' },
										{ value: '25', label: '25' },
										{ value: '50', label: '50' },
										{ value: '100', label: '100' },
									]}
								/>
								<span>Per page</span>
							</div>
						</div>
						<Pagination total={totalPages} page={page} onChange={setPage} />
					</div>
				</>
			)}
		</div>
	);
};

export default Calls;
