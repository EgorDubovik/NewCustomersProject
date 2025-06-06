import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconPencil from '../../../components/Icon/IconPencil';
import { viewCurrency, calculateTaxAndTotal, alertSuccsess, alertError } from '../../../helpers/helper';
import { useState, Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SmallDangerLoader } from '../../../components/loading/SmallCirculeLoader';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';
import AutoComplete from '../../../components/plugin/autocomplite/AutoComplete';
import axiosClient from '../../../store/axiosClient';
import { IService } from '../../../types';
import { useSelector } from 'react-redux';
import IconCopy from '../../../components/Icon/IconCopy';
import IconAI from '../../../components/Icon/IconAI';

const ServicesList = (props: any) => {
	const isEditble = props.isEditble;
	const [loadingRemove, setLoadingRemove] = useState(0);
	const loadingStatus = props.loadingStatus || false;
	const { services, payments, onRemoveService, onSaveService, onUpdateService, modal, setModal } = props;
	const taxRate = useSelector((state: any) => state.themeConfig.companySettings.taxRate);
	const { tax, total } = calculateTaxAndTotal(services, taxRate);
	const [companyServices, setCompanyServices] = useState([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const priceRef = useRef(null);
	const [AIloadingStatus, setAIloadingStatus] = useState<'none' | 'loading' | 'success'>('none');

	const isTaxble = localStorage.getItem('isTaxable') === 'true' ? true : false;
	console.log('isTaxble:', isTaxble);
	const [serviceForm, setServiceForm] = useState<IService>({
		id: 0,
		title: '',
		description: '',
		price: 0,
		taxable: isTaxble,
	});
	const addNewService = () => {
		setServiceForm({
			id: 0,
			title: '',
			description: '',
			price: 0,
			taxable: isTaxble,
		});
		setIsEditMode(false);
		setModal(true);
	};
	const serviceFormChangeHandler = (e: any) => {
		if (e.target.name === 'price' && isNaN(e.target.value) && e.target.value !== '-') return;
		if (e.target.name === 'taxable') {
			setServiceForm({ ...serviceForm, [e.target.name]: e.target.checked });
		} else setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
	};

	const handleSaveService = () => {
		if (serviceForm.title === '') return;
		localStorage.setItem('isTaxable', serviceForm.taxable.toString());
		if (serviceForm.id === 0) {
			onSaveService(serviceForm);
		} else {
			onUpdateService(serviceForm);
		}
	};

	const handleRemoveService = (id: number) => {
		setLoadingRemove(id);
		onRemoveService(id);
	};

	const editServiceHandle = (service: any) => {
		setServiceForm(service);
		setIsEditMode(true);
		setModal(true);
	};

	useEffect(() => {
		setLoadingRemove(0);
	}, [services]);

	// Load company services
	useEffect(() => {
		axiosClient
			.get(`company/settings/services`)
			.then((res) => {
				setCompanyServices(res.data.services);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//Copy services price to clipboard to share with customer
	const copyServicesPrice = () => {
		let total = 0;
		let servicesPrice = services
			.map((service: any) => {
				const service_tax = service.taxable ? (service.price * taxRate) / 100 : 0;
				const subTotal = parseFloat(service.price) + service_tax;
				total += subTotal;
				return `${service.title}: ${viewCurrency(service.price)} + ${viewCurrency(service_tax)} (tax) = ${viewCurrency(subTotal)}`;
			})
			.join('\n');
		servicesPrice += `\n\nTotal: ${viewCurrency(total)}`;

		let totalPaid = payments.reduce((acc: any, payment: any) => acc + parseFloat(payment.amount), 0);

		if (totalPaid > 0) {
			servicesPrice += `\nTotal Paid: ${viewCurrency(totalPaid)}`;
			servicesPrice += `\n\nBalance: ${viewCurrency(total - totalPaid)}`;
		}

		navigator.clipboard
			.writeText(servicesPrice)
			.then(() => {
				alertSuccsess('Services price copied to clipboard');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleAI = () => {
		setAIloadingStatus('loading');
		axiosClient
			.post(import.meta.env.VITE_AI_URL + '/ai/get-job-report', {
				title: serviceForm.title,
				description: serviceForm.description,
			})
			.then((res) => {
				console.log(res.data);
				if (!res.data.report) return;
				setServiceForm({ ...serviceForm, description: res.data.report });
				setAIloadingStatus('success');
				setTimeout(() => {
					setAIloadingStatus('none');
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
				alertError('AI failed to generate answer');
				setAIloadingStatus('none');
			});
	};

	return (
		<>
			<div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
				<table className="whitespace-nowrap">
					<tbody className="dark:text-white">
						{services.map((service: any, index: number) => (
							<tr key={index}>
								<td>
									<div>{service.title}</div>
									<div className="mt-2 dark:text-gray-400 overflow-hidden" style={{ whiteSpace: 'pre-line' }}>
										{service.description}
									</div>
								</td>

								<td className="">{viewCurrency(parseFloat(service.price))}</td>
								<td className="py-3 px-2 md:p-3 border-b border-[#ebedf2] dark:border-[#191e3a] text-right">
									<div className="text-right">
										{isEditble && (
											<button onClick={() => editServiceHandle(service)} type="button" className="mr-4 hover:text-warning">
												<IconPencil />
											</button>
										)}
										{loadingRemove === service.id ? (
											<SmallDangerLoader />
										) : (
											<button onClick={() => handleRemoveService(service.id)} type="button" className="hover:text-danger">
												<IconTrashLines />
											</button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
				<table className="whitespace-nowrap text-right">
					<tbody className="dark:text-white-dark">
						<tr>
							<td style={{ textAlign: 'right' }}>Tax</td>
							<td width={'20%'} className="text-danger" style={{ textAlign: 'right' }}>
								{viewCurrency(tax)}
							</td>
						</tr>
						<tr>
							<td style={{ textAlign: 'right' }}>TOTAL</td>
							<td className="text-success" style={{ textAlign: 'right' }}>
								{viewCurrency(total)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between mt-4">
				<div className="flex justify-center w-full">
					<span className="flex cursor-pointer hover:text-primary border-b dark:border-gray-800 border-gray-200 py-2" onClick={() => addNewService()}>
						<IconPlus className="mr-2" />
						Add new Service
					</span>
				</div>
				<span className="flex cursor-pointer ml-auto" onClick={copyServicesPrice}>
					<IconCopy className="hover:text-primary" />
				</span>
			</div>

			<Transition appear show={modal} as={Fragment}>
				<Dialog as="div" open={modal} onClose={() => setModal(false)} initialFocus={isEditMode ? priceRef : undefined}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0" />
					</Transition.Child>
					<div id="login_modal" className="fixed inset-0 bg-[black]/60 z-[1111] overflow-y-auto">
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
								<Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg w-full max-w-sm my-8 text-black dark:text-white-dark">
									<div className="flex items-center justify-between p-3 dark:text-white">
										<h5>Update Service</h5>
									</div>
									<div className="p-3">
										<form>
											<div className="relative mb-4">
												<AutoComplete
													inputValue={serviceForm.title}
													list={companyServices}
													onInputChange={(value) => setServiceForm({ ...serviceForm, title: value })}
													onSaggestionClick={(item) => setServiceForm({ ...serviceForm, title: item.title, price: item.price, description: item.description })}
												>
													<input type="text" placeholder="Title" className="form-input" name="title" />
												</AutoComplete>
											</div>
											<div className="relative mb-4">
												<input
													ref={priceRef}
													type="text"
													placeholder="Price"
													className="form-input"
													pattern="\d*\.?\d*"
													name="price"
													onChange={serviceFormChangeHandler}
													value={serviceForm.price}
													onFocus={(e) => e.target.select()}
												/>
											</div>
											<div className={`relative mb-4 ${AIloadingStatus === 'success' ? 'has-success' : ''}`}>
												<textarea
													placeholder="Description"
													className="form-textarea transition-colors duration-500"
													name="description"
													onChange={serviceFormChangeHandler}
													value={serviceForm.description}
												></textarea>
											</div>
											<div className="relative mb-4 flex items-center justify-between">
												<label className="inline-flex items-center text-sm">
													<input type="checkbox" className="form-checkbox outline-primary" name="taxable" onChange={serviceFormChangeHandler} checked={serviceForm.taxable} />
													<span className=" text-white-dark">Taxable</span>
												</label>

												<div onClick={handleAI} className="cursor-pointer flex items-center gap-2  ">
													{AIloadingStatus === 'loading' ? <ButtonLoader /> : <IconAI className="text-orange-400" />}
													<span className="bg-gradient-to-r from-orange-500 via-blue-500 to-violet-500 text-transparent bg-clip-text">AI generate</span>
												</div>
											</div>
											<div className="flex justify-end items-center mt-8">
												<button type="button" onClick={() => setModal(false)} className="btn btn-outline-danger">
													Discard
												</button>
												<button type="button" onClick={handleSaveService} className="btn btn-primary ltr:ml-4 rtl:mr-4">
													{loadingStatus === true ? <ButtonLoader /> : 'Save'}
												</button>
											</div>
										</form>
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

export default ServicesList;
