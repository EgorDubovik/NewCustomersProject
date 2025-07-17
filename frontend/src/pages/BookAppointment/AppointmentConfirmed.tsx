import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { AppointmentInfoType } from './@types';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { ButtonLoader } from '../../components/loading/ButtonLoader';
import { SinglePageErrorLoading, SinglePageLoading } from '../../components/loading/Loadings';
import { viewCurrency } from '../../helpers/helper';
const AppointmentConfirmed = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageTitle('View Appointment'));
	});
	const { providerKey } = useParams();
	const [btnStatus, setBtnStatus] = useState(false);
	const [loadingStatus, setLoadingStatus] = useState('loading');
	const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfoType>({
		company: {
			name: '',
			phone: '',
			logo: '',
		},
		customer: {
			name: '',
			email: '',
			phone: '',
			address: '',
		},
		appointment: {
			time1: '',
			time2: '',
			time3: '',
		},
		services: [],
	});
	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + '/appointment/book/view/' + providerKey)
			.then((response) => {
				if (!response.ok) throw Error(response.statusText);
				else return response.json();
			})
			.then((data) => {
				setLoadingStatus('success');
				setAppointmentInfo(data);
			})
			.catch((error) => {
				console.error('Error:', error);
				setLoadingStatus('error');
			});
	}, []);

	const navigate = useNavigate();
	const cancelAppointment = () => {
		if (btnStatus) return;
		setBtnStatus(true);
		fetch(import.meta.env.VITE_API_URL + '/appointment/book/remove/' + providerKey)
			.then((response) => {
				if (!response.ok) throw Error(response.statusText);
				else return response.json();
			})
			.then((data) => {
				console.log(data);
				navigate('/appointment/book/cancel/' + data.key);
			})
			.catch((error) => {
				console.error('Error:', error);
			})
			.finally(() => {
				setBtnStatus(false);
			});
	};

	return (
		<div className="App h-full">
			{loadingStatus === 'loading' && <SinglePageLoading />}
			{loadingStatus === 'error' && <SinglePageErrorLoading />}
			{loadingStatus === 'success' && (
				<div className="">
					<Header {...appointmentInfo.company} />
					<div className="max-w-4xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">
						{/* Header */}
						<div className="text-center mb-12">
							<div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-pulse">
								<svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Appointment Confirmed!</h1>
							<p className="mt-4 text-lg text-gray-600">Your appliance repair request has been successfully booked.</p>
						</div>

						{/* Card */}
						<div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
							{/* Card Header */}
							<div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-6 sm:px-8">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-bold text-white">Booking Details</h2>
									<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">CONFIRMED</span>
								</div>
							</div>

							{/* Card Body */}
							<div className="px-6 py-8 sm:px-8">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									{/* Left Column */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Information</h3>

										<div className="space-y-4">
											<div className="flex items-start">
												<div className="mr-6">
													<svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-500">Date & Time</p>
													<p className="text-base font-semibold text-gray-900" id="appointment-time">
														{appointmentInfo.appointment.time1}
													</p>
												</div>
											</div>

											<div className="flex items-start">
												<div className="mr-6">
													<svg className="text-green-600" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
														<path d="M200-200v-560 179-19 400Zm80-240h221q2-22 10-42t20-38H280v80Zm0 160h157q17-20 39-32.5t46-20.5q-4-6-7-13t-5-14H280v80Zm0-320h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v258q-14-26-34-46t-46-33v-179H200v560h202q-1 6-1.5 12t-.5 12v56H200Zm480-200q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM480-120v-56q0-24 12.5-44.5T528-250q36-15 74.5-22.5T680-280q39 0 77.5 7.5T832-250q23 9 35.5 29.5T880-176v56H480Z" />
													</svg>
												</div>

												<div>
													<p className="text-sm font-medium text-gray-500">Contact Person</p>
													<p className="text-base font-semibold text-gray-900" id="service-address">
														{appointmentInfo.customer.name}
														<p className="text-gray-500 text-sm">{appointmentInfo.customer.phone}</p>
													</p>
												</div>
											</div>

											<div className="flex items-start">
												<div className="mr-6">
													<svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
														/>
													</svg>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-500">Service Address</p>
													<p className="text-base font-semibold text-gray-900" id="service-address">
														{appointmentInfo.customer.address}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Right Column */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>

										<div className="space-y-4">
											{appointmentInfo.services.map((service, index) => {
												return (
													<div key={index} className="flex items-center justify-between">
														<div className="">
															<p className="text-base font-semibold text-gray-900">{service.title}</p>
															<p className="text-sm font-medium text-gray-500">{service.description}</p>
														</div>
														<p className="text-base font-semibold text-gray-900">{viewCurrency(service.price)}</p>
													</div>
												);
											})}
										</div>
										<div className="flex items-center justify-between mt-8">
											<p className="text-base font-semibold text-gray-900">Total:</p>
											<p className="text-base font-semibold text-gray-900">{viewCurrency(appointmentInfo.services.reduce((total, service) => total + Number(service.price), 0))}</p>
										</div>
									</div>
								</div>
							</div>

							{/* Card Footer */}
							<div className="bg-gray-50 px-6 py-5 sm:px-8 border-t border-gray-200 rounded-b-2xl">
								<div className="flex flex-col sm:flex-row justify-between items-center">
									<div className="mb-4 sm:mb-0">
										<h4 className="text-base font-medium text-gray-500">Need to make changes?</h4>
										<a href="#" className="text-base font-medium text-blue-600 hover:text-blue-500">
											Please contact us at <b>{appointmentInfo.company.phone}</b>
										</a>
									</div>
									<div>
										<button
											type="button"
											onClick={() => {
												cancelAppointment();
											}}
											className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										>
											Cancel Appointment
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="mt-12 bg-white shadow rounded-2xl p-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">What to expect next</h3>

							<ol className="relative border-l border-gray-200">
								<li className="mb-6 ml-4">
									<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>

									<div className="ml-4">
										<h4 className="text-base font-semibold text-gray-900">Confirmation email</h4>
										<p className="text-sm text-gray-600">You'll receive an email confirmation with these details</p>
									</div>
								</li>
								<li className="mb-6 ml-4">
									<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>

									<div className="ml-4">
										<h4 className="text-base font-semibold text-gray-900">Our technician will contact you</h4>
										<p className="text-sm text-gray-600">Our technician will call you around 30 minutes before arrival</p>
									</div>
								</li>
								<li className="mb-6 ml-4">
									<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>

									<div className="ml-4">
										<h4 className="text-base font-semibold text-gray-900">Preparing for your appointment</h4>
										<p className="text-sm text-gray-600">Please have your appliance accessible</p>
									</div>
								</li>
								<li className="mb-6 ml-4">
									<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>

									<div className="ml-4">
										<h4 className="text-base font-semibold text-gray-900">Payment</h4>
										<p className="text-sm text-gray-600">Payment will be collected after service completion</p>
									</div>
								</li>
							</ol>

							<div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
								<h4 className="font-medium text-yellow-800 mb-2">Need to make changes or have an emergency?</h4>
								<p className="text-gray-700 mb-2">
									Call us immediately at <strong className="text-yellow-700">{appointmentInfo.company.phone}</strong>
								</p>
							</div>
						</div>

						{/* Support Section */}
						<div className="mt-8 text-center">
							<p className="text-sm text-gray-500">
								Need immediate assistance? Call us at{' '}
								<a href="tel:{appointmentInfo.company.phone}" className="font-medium text-blue-600 hover:text-blue-500">
									{appointmentInfo.company.phone}
								</a>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AppointmentConfirmed;
