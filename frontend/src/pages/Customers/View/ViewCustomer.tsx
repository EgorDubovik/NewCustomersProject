import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconPencilPaper from '../../../components/Icon/IconPencilPaper';
import IconMapPin from '../../../components/Icon/IconMapPin';
import IconPhone from '../../../components/Icon/IconPhone';
import IconMail from '../../../components/Icon/IconMail';
import { alertError, alertSuccsess, formatDate, getAppointmentColor, viewCurrency } from '../../../helpers/helper';
import IconPlus from '../../../components/Icon/IconPlus';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { PageLoadError } from '../../../components/loading/Errors';
import IconCalendar from '../../../components/Icon/IconCalendar';
import { useViewCustomer } from './useViewCustomer';
import IconCopy from '../../../components/Icon/IconCopy';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import axiosClient from '../../../store/axiosClient';
import MapComponent from './MapComponent';
const ViewCustomer = () => {
	const { customer, loadingStatus } = useViewCustomer();
	const [limitViewJobs, setLimitViewJobs] = useState(3);
	const copyPhone = (phone: string) => {
		navigator.clipboard
			.writeText(phone)
			.then(() => {
				alertSuccsess('Phone number copied to clipboard');
			})
			.catch((err) => {
				alertError('Failed to copy phone number');
			});
	};

	const removeJob = (jobId: number) => {
		if (window.confirm('Are you sure you want to remove this job?')) {
			axiosClient('job/' + jobId, { method: 'DELETE' })
				.then((res) => {
					alertSuccsess('Job removed successfully');
					window.location.reload();
				})
				.catch((err) => {
					alertError('Failed to remove job');
				});
		}
	};

	const openCompanyTags = () => {};
	console.log('CUSTOMER:', customer);
	return (
		<>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="py-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="panel p-0">
							<div className="flex items-center justify-between p-4">
								<h3 className="font-semibold text-lg dark:text-white-light">Customer</h3>
								<Link to={'/customer/update/' + (customer.id ?? 0) + '?redirectTo=' + window.location.pathname} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
									<IconPencilPaper className="w-4 h-4" />
								</Link>
							</div>
							<div className="mb-1">
								<div className="flex flex-col justify-center items-center ">
									{/* MAP */}
									{/* <MapComponent latitude={customer?.address[0]?.lat} longitude={customer?.address[0]?.lon} /> */}
									<div className="w-full h-[250px] dark:bg-gray-800 bg-gray-200 flex items-center justify-center">No Location found</div>
									<p className="font-semibold text-primary text-lg mt-4">{customer?.name}</p>
								</div>
								<div className="px-4 pb-4">
									<ul className="mt-5 flex flex-col m-auto space-y-4 font-semibold text-white-dark">
										{/* ADDRESS */}
										{customer?.address?.map((address: any, index: number) => (
											<li key={index} className="flex items-center gap-2">
												<IconMapPin className="shrink-0" />
												<a href={`https://www.google.com/maps?q=${encodeURIComponent(address.full)}`} target="_blank" rel="noopener noreferrer">
													{address?.full}
												</a>
											</li>
										))}
										<li className="flex justify-between">
											<div className="flex gap-2">
												<IconPhone />
												<span className="whitespace-nowrap" dir="ltr">
													<a href={`tel:${customer.phone}`}>{customer?.phone}</a>
												</span>
											</div>
											<button onClick={() => copyPhone(customer.phone || '')}>
												<IconCopy className="text-primary cursor-pointer" />
											</button>
										</li>
										<li>
											<div className="flex gap-2">
												<IconMail className="w-5 h-5 shrink-0" />
												<span className="text-primary truncate">{customer?.email}</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-3">
							<div className="panel p-4">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-lg dark:text-white-light">Jobs history ({customer.jobs.length})</h3>
									<Link to={`/appointment/create/${customer.id}`} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
										<IconPlus className="w-4 h-4" />
									</Link>
								</div>

								<div className="appointments-list py-4">
									{customer?.jobs?.slice(-limitViewJobs).map((job: any, index: number) =>
										job.appointments.length > 0 ? (
											<Link to={`/appointment/${job.appointments[job.appointments.length - 1].id}`} key={index}>
												<div
													className="p-2 shadow bg-[#f4f4f4] dark:bg-white-dark/20 rounded border-l-2 mb-3"
													style={{
														borderColor: getAppointmentColor(job.appointments[job.appointments.length - 1]),
													}}
												>
													<div className="px-4 flex items-center justify-between">
														<div className="min-w-0 flex-1">
															<p className="font-bold dark:text-gray-300">{job?.services[0]?.title}</p>
															<p className="whitespace-nowrap overflow-hidden text-ellipsis">{job?.services[0]?.description}</p>
														</div>
														<div className={`text-${job.remaining_balance > 0 ? 'danger' : 'success'} text-center text-[12px]`}>
															{viewCurrency(job.remaining_balance > 0 ? job.remaining_balance : job.total_paid)}
														</div>
													</div>
													<div className="flex items-center justify-between px-4 mt-2">
														<div className="flex items-center">
															<IconCalendar className="w-4 h-4" />
															<span className="ml-2">{formatDate(job.appointments[job.appointments.length - 1].start, 'MMM DD, YYYY')}</span>
														</div>
														<div className="">{job.appointments.length} Visits</div>
													</div>
												</div>
											</Link>
										) : (
											<div className="p-2 shadow bg-[#f4f4f4] dark:bg-white-dark/20 rounded border-l-2 mb-3 border-gray-500" key={index}>
												<div className="px-4 flex items-center justify-between w-full ">
													<div>
														<p className="font-bold dark:text-gray-300">{job?.services[0]?.title}</p>
														<p className="w-full max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">{job?.services[0]?.description}</p>
													</div>
													{job.remaining_balance > 0 ? (
														<div className="text-danger text-center text-[12px]">{viewCurrency(job.remaining_balance)}</div>
													) : (
														<div className="text-success text-center text-[12px]">{viewCurrency(job.total_paid)}</div>
													)}
												</div>
												<div className="flex items-center justify-between px-4 mt-2">
													<div className="flex items-center">
														<IconCalendar className="w-4 h-4" />
														<Link to={`/appointment/create/${customer.id}?job_id=${job.id}`} className="ml-2 text-primary">
															Create appointment
														</Link>
													</div>
													<div
														className="cursor-pointer text-danger flex"
														onClick={() => {
															removeJob(job.id);
														}}
													>
														<IconTrashLines className="mr-2" />
														Remove job
													</div>
												</div>
											</div>
										)
									)}
									{customer?.jobs?.length > limitViewJobs && (
										<div className="border-t border-white-light dark:border-white/10">
											<div
												onClick={() => {
													setLimitViewJobs(customer.jobs.length);
												}}
												className="cursor-pointer group group flex items-center justify-center p-4 font-semibold hover:text-primary"
											>
												View All {customer.jobs.length} Jobs
												<svg
													className="h-4 w-4 transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg>
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="panel">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-lg dark:text-white-light">Tags</h3>
									<button className="btn btn-primary p-2 rounded-full" onClick={openCompanyTags}>
										<IconPlus className="w-4 h-4" />
									</button>
								</div>
								<div className="teags-list">
									{customer?.tags?.map((tag: any, index: number) => (
										<div key={index} className="tag-item">
											<span className="text-primary">{tag.name}</span>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="panel"></div>
					</div>
				</div>
			)}
		</>
	);
};

export default ViewCustomer;
