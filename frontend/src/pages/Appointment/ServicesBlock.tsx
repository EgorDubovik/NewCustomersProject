import { useState } from 'react';
import moment from 'moment';
import axiosClient from '../../store/axiosClient';
import { useAppointmentContext } from './context/AppointmentContext';
import { viewCurrency } from '../../helpers/helper';
import ServicesList from './components/ServicesList';
import Refund from './Refund';

const ServicesBlock = () => {
	const { appointment, updateServices } = useAppointmentContext();
	const services = appointment?.job.services || [];
	const [modal, setModal] = useState(false);
	const [serviceFormLoading, setServiceFormLoading] = useState(false);
	const remaining = appointment?.job?.remaining_balance || 0;

	const handleSaveService = (service: any) => {
		setServiceFormLoading(true);
		if (service.id !== 0) {
			// update
			console.log('update service:');
			axiosClient
				.put(`appointment/service/${appointment?.job_id}/${service.id}`, service)
				.then((res: any) => {
					if (res.status === 200) {
						const updatedServices = services.map((s: any) => {
							if (s.id === service.id) {
								return service;
							}
							return s;
						});
						updateServices(updatedServices);
						setModal(false);
					}
				})
				.catch((err) => {
					alert('Something went wrong. Please try again later');
					console.log(err);
				})
				.finally(() => {
					setServiceFormLoading(false);
				});
		} else {
			// store
			console.log('store service:');
			axiosClient
				.post(`appointment/service/${appointment?.job_id}`, service)
				.then((res: any) => {
					if (res.status === 200) {
						services.push(res.data.service);
						updateServices(services);
						setModal(false);
					}
				})
				.catch((err) => {
					alert('Something went wrong. Please try again later');
					console.log(err);
				})
				.finally(() => {
					setServiceFormLoading(false);
				});
		}
	};

	const handleRemoveService = (serviceId: number) => {
		axiosClient
			.delete(`appointment/service/${appointment?.job_id}/${serviceId}`)
			.then((res) => {
				if (res.status === 200) {
					updateServices(services.filter((service: any) => service.id !== serviceId));
				}
			})
			.catch((err) => {
				if (err.response.status === 403) {
					alert('You are not allowed to delete this service');
				} else {
					alert('Something went wrong. Please try again later');
				}
				console.log(err);
			});
	};

	return (
		<div className="panel">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-lg dark:text-white-light">Services</h3>
			</div>
			<div className="mt-3">
				<ServicesList
					services={services}
					payments={appointment?.job.payments}
					onRemoveService={handleRemoveService}
					onSaveService={handleSaveService}
					onUpdateService={handleSaveService}
					modal={modal}
					loadingStatus={serviceFormLoading}
					isEditble={true}
					setModal={setModal}
				/>
				<div className="mt-4 flex justify-between items-center py-4">
					<div className="text-sm">
						{remaining > 0 && <span className="text-danger ml-2">Remaining: {viewCurrency(remaining)}</span>}
						{remaining <= 0 && services.length > 0 && <span className="text-success ml-2">Paid full</span>}
					</div>
					<Refund />
				</div>
				<div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
					<table className="whitespace-nowrap">
						<tbody className="dark:text-white-dark">
							{appointment?.job.payments.map((payment: any, index: number) => (
								<tr key={index}>
									<td>{moment(payment.created_at).format('MMM DD YYYY h:mm A')}</td>
									<td>{payment.type_text}</td>
									<td>{viewCurrency(payment.amount)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ServicesBlock;
