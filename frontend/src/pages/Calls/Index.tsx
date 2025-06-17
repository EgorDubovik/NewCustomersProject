import { Link } from 'react-router-dom';
import IconAddCall from '../../components/Icon/IconAddCall';
import IconCopy from '../../components/Icon/IconCopy';
import IconPersonAdd from '../../components/Icon/IconPersonAdd';
import IconPhoneForwarded from '../../components/Icon/IconPhoneForwarded';
import IconPhoneMissed from '../../components/Icon/IconPhoneMissed';
import IconPlayCircle from '../../components/Icon/IconPlayCircle';
import IconIncomingCall from '../../components/Icon/InconIncomingCall';

const Calls = () => {
	return (
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
					<div className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow">
						<div className="flex items-center gap-2">
							<div className="incoming-call w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
								<IconIncomingCall className="w-5 h-5 text-white" />
							</div>
							<div className="number ml-2 w-[150px]">
								<p className="dark:text-white text-base flex items-center gap-2">+1 (234) 567-8901 </p>
							</div>
							<div className="status ml-6 w-[70px]">
								<p className="text-success">
									Incoming{' '}
									<p className="">
										<span className="dark:text-white text-sm">2:25 m</span>
									</p>
								</p>
							</div>
							<div className="date ml-4">
								<p className="text-sm">May 25, 2025 10:25 AM </p>
							</div>
						</div>
						<div className="actions flex items-center gap-4">
							<div className="has-audio ml-4">
								<IconPlayCircle className="w-8 h-8  text-primary" />
							</div>
							<button className="">
								<IconPersonAdd className="w-6 h-6  text-success" />
							</button>
						</div>
					</div>
					<div className="flex justify-between items-center dark:bg-gray-900 bg-white p-4 rounded shadow">
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
					</div>
				</div>
			</div>
			<div className="panel"></div>
		</div>
	);
};

export default Calls;
