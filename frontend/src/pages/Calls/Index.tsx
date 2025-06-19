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
import IconClose from '../../components/Icon/IconClose';

interface ICall {
	id: string;
	from_number: string;
	to_number: string;
	direction: string;
	conversation_id: string;
	user_id: string;
	phone_number_id: string;
	duration_seconds: number;
	status: string;
	is_missed_call: boolean;
	recording_url: string;
	voicemail_url: string;
	voicemail_duration: number;
	answered_at: string;
	completed_at: string;
	created_at: string;
	updated_at: string;
	customer: {
		id: string;
		name: string;
		phone_number: string;
	};
}

const Calls = () => {
	const [calls, setCalls] = useState<ICall[]>([]);
	const [selectedCall, setSelectedCall] = useState<ICall | null>(null);
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
													<p className="dark:text-white text-sm flex items-center gap-2">{call.from_number}</p>
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
										<button className="">
											<IconPersonAdd className="w-6 h-6  text-success" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="panel p-0">
						{selectedCall && (
							<div>
								<div className={`header flex items-center justify-between p-4 rounded-t-lg dark:text-white text-gray-800  `}>
									<div className="flex items-center gap-2">
										<div className="">
											{selectedCall.is_missed_call ? (
												<IconPhoneMissed className="w-6 h-6 text-danger" />
											) : selectedCall.direction === 'incoming' ? (
												<IconIncomingCall className="w-6 h-6 text-success" />
											) : (
												<IconPhoneForwarded className="w-6 h-6 text-info" />
											)}
										</div>
										<div className="number">
											<p className="text-lg">{selectedCall.from_number}</p>
										</div>
									</div>
									<div className="actions flex items-center gap-4">
										<button className="text-white" onClick={() => setSelectedCall(null)}>
											<IconClose className="w-6 h-6" />
										</button>
									</div>
								</div>
								<div className="content mt-4">
									<div className="call-info">
										<p className="text-sm">Duration: {formatCallDurationText(selectedCall.duration_seconds)}</p>
										<p className="text-sm">Status: {selectedCall.is_missed_call ? 'Missed' : selectedCall.direction}</p>
										<p className="text-sm">Date: {formatDate(selectedCall.created_at, 'MMM DD YYYY at HH:mm A')}</p>
									</div>
									<div className="call-actions">
										<button className="">
											<IconPersonAdd className="w-6 h-6  text-success" />
										</button>
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

export default Calls;
