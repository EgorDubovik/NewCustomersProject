import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import { useAppointmentContext } from './context/AppointmentContext';
import TimePicker from 'edtimepicker';
import axiosClient from '../../store/axiosClient';
import { alertError, manualIsoString } from '../../helpers/helper';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/helper';
const TimeLine = () => {
	const [modal, setModal] = useState(false);
	const { appointment, updateTime } = useAppointmentContext();
	const [showMore, setShowMore] = useState(false);
	const [selectedTime, setSelectedTime] = useState('timeFrom');
	const [timeFrom, setTimeFrom] = useState(new Date(appointment?.start || new Date()));
	const [timeTo, setTimeTo] = useState(new Date(appointment?.end || new Date(timeFrom.getTime() + 60 * 120 * 1000)));
	const [timeToIsSelected, setTimeToIsSelected] = useState(false);
	const [updateStatus, setUpdateStatus] = useState(false);

	const onTimeFromChanged = (date: any) => {
		setTimeFrom(date);
		if (!timeToIsSelected) setTimeTo(new Date(date.getTime() + 60 * 120 * 1000));
	};

	const onTimeToChanged = (date: any) => {
		setTimeToIsSelected(true);
		setTimeTo(date);
	};

	const updateAppointmentTimeHandle = () => {
		setUpdateStatus(true);

		axiosClient
			.put(`/appointment/${appointment?.id}`, {
				timeFrom: manualIsoString(timeFrom),
				timeTo: manualIsoString(timeTo),
			})
			.then((res) => {
				updateTime(timeFrom.toString(), timeTo.toString());
				setModal(false);
			})
			.catch((err) => {
				alertError('Something went wrong');
				console.log(err);
			})
			.finally(() => {
				setUpdateStatus(false);
			});
	};
	return (
		<>
			<div className="flex items-center justify-between pb-0 md:pb-4">
				<div className="flex items-center">
					<h3 className="font-semibold text-lg dark:text-white-light">Time</h3>
					<span className="ml-4">
						Job id: <span className="font-bold text-primary">{appointment?.job?.id}</span>
					</span>
				</div>
				<button className="btn btn-primary p-2 rounded-full" onClick={() => setModal(true)}>
					<IconPencilPaper className="w-4 h-4" />
				</button>
			</div>
			<div className="timeline">
				<div className="max-w-[300px] mx-auto">
					{appointment?.job.appointments.slice(0, showMore ? appointment.job.appointments.length : 3).map((jappointment: any, index: number) => (
						<Link to={`/appointment/${jappointment.id}`} key={index}>
							<div className={`flex ${appointment.id !== jappointment.id ? 'opacity-50' : ''}`} key={index}>
								<p
									className={`text-[#3b3f5c] dark:text-white-light w-[120px] ${
										appointment.id !== jappointment.id || appointment.job.appointments.length == 1 ? 'text-sm' : 'text-lg'
									} font-semibold py-2.5 text-right`}
								>
									{formatDate(jappointment?.start, 'DD MMM, YYYY')}
								</p>
								<div
									className={`relative before:absolute before:top-[15px] before:translate-x-[20px] before:w-2.5 before:h-2.5 before:border-2 before:border-[var(--border-color)] before:rounded-full ${
										index !== appointment?.job.appointments.length - 1
											? `after:absolute  after:translate-x-[24px] after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-[var(--border-color)] after:rounded-full`
											: ''
									}`}
									style={
										{
											'--before-border-color': jappointment.techs?.length > 0 ? jappointment.techs[jappointment.techs.length - 1].color : '#1565C0',
											'--after-border-color': jappointment.techs?.length > 0 ? jappointment.techs[jappointment.techs.length - 1].color : '#1565C0',
										} as React.CSSProperties
									}
								></div>
								<div className="p-2.5 self-center ml-9 mr-2.5 w-[110px]">
									<p
										className={`text-[#3b3f5c] dark:text-white-light font-semibold ${appointment.id !== jappointment.id || appointment.job.appointments.length == 1 ? 'text-sm' : 'text-lg'}`}
									>
										{formatDate(jappointment?.start, 'hh:mm A')}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
				{!showMore && appointment?.job.appointments.length > 3 && (
					<div className="cursor-pointer text-center mt-4 text-primary" onClick={() => setShowMore(!showMore)}>
						show all
					</div>
				)}
				<style>{`
               .relative::before {
                  border-color: var(--before-border-color, #1565C0);
               }
               .relative::after {
                  border-color: var(--after-border-color, #1565C0);
               }
            `}</style>
			</div>
			<Transition appear show={modal} as={Fragment}>
				<Dialog as="div" open={modal} onClose={() => setModal(false)}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0" />
					</Transition.Child>
					<div id="login_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
						<div className="flex items-start justify-center min-h-screen px-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="panel border-0 py-6 px-4 rounded-lg overflow-hidden w-full max-w-lg mt-10  text-black dark:text-white-dark">
									<div className="p-2 md:p-4">
										<div className="mt-1">
											<div className="mb-5 flex justify-center bg-gray-100 dark:bg-white-dark/10 rounded p-2">
												<div
													onClick={() => setSelectedTime('timeFrom')}
													className={
														'w-1/2 timeFrom flex justify-between items-center cursor-pointer py-3 px-2 rounded ' +
														(selectedTime === 'timeFrom' ? 'dark:bg-black/25 dark:text-white font-bold bg-gray-200' : '')
													}
												>
													<div>From:</div>
													<div className="text-center">
														<div>{formatDate(timeFrom, 'MMM DD')}</div>
														<div>{formatDate(timeFrom, 'hh:mm A')}</div>
													</div>
												</div>
												<div
													onClick={() => setSelectedTime('timeTo')}
													className={
														'w-1/2 timeFrom flex justify-between items-center cursor-pointer py-3 px-2 rounded ' +
														(selectedTime === 'timeTo' ? 'dark:bg-black/25 dark:text-white font-bold bg-gray-200' : '')
													}
												>
													<div>To:</div>
													<div className="text-center">
														<div>{formatDate(timeTo, 'MMM DD')}</div>
														<div>{formatDate(timeTo, 'hh:mm A')}</div>
													</div>
												</div>
											</div>
											<div className="text-[16px] dark:text-white-light">
												{selectedTime === 'timeFrom' && (
													<TimePicker
														currentDate={timeFrom}
														options={{
															itemsHeight: 45,
															daysNameFormat: 'MMM DD, DDDD',
															borderColor: '#077afe',
														}}
														onDateChange={onTimeFromChanged}
													/>
												)}
												{selectedTime === 'timeTo' && (
													<TimePicker
														currentDate={timeTo}
														options={{
															itemsHeight: 45,
															daysNameFormat: 'MMM DD, DDDD',
															borderColor: '#077afe',
														}}
														onDateChange={onTimeToChanged}
													/>
												)}
											</div>
										</div>
										<div className="flex justify-center mt-4">
											<button onClick={updateAppointmentTimeHandle} className="btn btn-primary w-full">
												Update
												{updateStatus && <ButtonLoader />}
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default TimeLine;
