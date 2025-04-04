import { useState, useEffect, Fragment, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TimePicker from 'edtimepicker';
import moment from 'moment';
import IconEdit from '../../../components/Icon/IconEdit';
import { Dialog, Transition } from '@headlessui/react';
import { alertError, manualIsoString } from '../../../helpers/helper';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import ServicesList from '../components/ServicesList';
import TechList from '../components/TechList';
import axiosClient from '../../../store/axiosClient';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { PageLoadError } from '../../../components/loading/Errors';
import { ICustomer, IAddress } from '../../../types';

const CreateAppointment = () => {
	const navigate = useNavigate();

	const getCurrentDate = () => {
		const date = new Date();
		if (date.getMinutes() > 45 && date.getMinutes() <= 59) {
			date.setHours(date.getHours() + 1);
			date.setMinutes(0);
			date.setSeconds(0);
		}
		return date;
	};
	const [timeFrom, setTimeFrom] = useState(getCurrentDate());
	const [timeTo, setTimeTo] = useState(new Date(new Date().getTime() + 60 * 120 * 1000));
	const [selectedTime, setSelectedTime] = useState('timeFrom');
	const [timeToIsSelected, setTimeToIsSelected] = useState(false);
	const [services, setServices] = useState<any[]>([]);
	const [modalService, setModalService] = useState(false);
	const [modalAddresses, setModalAddresses] = useState(false);
	const [openAddresses, setOpenAddresses] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [loadingCreate, setLoadingCreate] = useState(false);
	const userId = useSelector((state: IRootState) => state.themeConfig.user.id);
	const [loadingStatus, setLoadingStatus] = useState('loading');
	const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
	// Services...
	const onRemoveService = (id: number) => {
		setServices(services.filter((service: any) => service.id !== id));
	};
	const onSaveService = (service: any) => {
		service.id = services.length + 1;
		setServices([...services, service]);
		setModalService(false);
	};

	const { customerId } = useParams();
	const [customer, setCustomer] = useState<ICustomer>();
	// Load customer Info
	useEffect(() => {
		setLoadingStatus('loading');
		axiosClient
			.get(`customers/${customerId}`)
			.then((res) => {
				setCustomer({
					id: res.data.customer.id,
					name: res.data.customer.name,
					phone: res.data.customer.phone,
					addresses: res.data.customer.address,
				});
				setSelectedAddress(res.data.customer.address[0] || null);
				setLoadingStatus('success');
			})
			.catch((err) => {
				setLoadingStatus('error');
				console.log(err);
			});
	}, []);

	const onTimeFromChanged = (date: any) => {
		console.log('time from:', date);
		setTimeFrom(new Date(date));
		if (!timeToIsSelected) setTimeTo(new Date(date.getTime() + 60 * 120 * 1000));
	};

	const onTimeToChanged = (date: any) => {
		setTimeToIsSelected(true);
		setTimeTo(new Date(date));
	};

	// Techs
	const [modalTech, setModalTech] = useState(false);
	const [techsIds, setTechsIds] = useState<Number[]>([]);

	const isTechAdded = (techId: number) => {
		return techsIds.includes(techId);
	};
	const onRemoveTech = (techId: number) => {
		setTechsIds(techsIds.filter((id: any) => id !== techId));
	};

	const onAddRemovetechFromList = (techId: number) => {
		if (isTechAdded(techId)) {
			setTechsIds(techsIds.filter((id) => id !== techId));
		} else {
			setTechsIds([...techsIds, techId]);
		}
	};

	const onSaveTeachs = () => {
		setModalTech(false);
	};
	useEffect(() => {
		setTechsIds([userId]);
	}, [userId]);

	const setNewAddress = (address: IAddress) => {
		setSelectedAddress(address);
		setOpenAddresses(false);
	};

	const createNewAppointment = () => {
		if (loadingCreate) return;
		if (!selectedAddress) {
			alertError('Please select an address');
			return;
		}
		setLoadingCreate(true);
		axiosClient
			.post('appointment', {
				timeFrom: manualIsoString(timeFrom),
				timeTo: manualIsoString(timeTo),
				services: services,
				techs: techsIds,
				customerId: customerId,
				addressId: selectedAddress?.id,
			})
			.then((res) => {
				if (res.status === 200) {
					navigate('/appointment/' + res.data.appointment.id);
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Error, please try again');
			})
			.finally(() => {
				setLoadingCreate(false);
			});
	};

	const openAddressesModal = () => {
		setOpenAddresses((prev) => !prev);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) // Check if click is outside the modal
			) {
				setOpenAddresses(false); // Close the modal
			}
		};

		if (openAddresses) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openAddresses]);
	return (
		<div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && customer && (
				<div>
					<div className="flex items-center justify-center flex-wrap gap-4 my-4 md:my-0 md:justify-start">
						<h2 className="text-xl">Create appointment</h2>
					</div>
					<div className="conteiner w-full md:w-1/3 m-auto">
						<div className="panel">
							<div className="mb-5 relative">
								<div className="border-b border-[#ebedf2] dark:border-[#1b2e4b] dark:bg-gray-800 px-2 rounded-t">
									<div className="flex items-center justify-between py-3">
										<h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
											{customer.name}
											<span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">{selectedAddress?.full || 'No address in customer'}</span>
										</h6>
										<div className="h-full p-2 cursor-pointer rounded hover:dark:bg-white-dark/10 hover:bg-gray-100" onClick={() => openAddressesModal()}>
											<IconEdit />
										</div>
									</div>
								</div>
								<div ref={modalRef} className={'absolute ' + (!openAddresses ? 'hidden' : '') + ' left-0 right-0 top-17 bg-gray-100 dark:bg-gray-800 py-4 rounded-b z-50 shadow-lg'}>
									{customer.addresses?.map((address: IAddress, index: number) => (
										<div key={index} className="address-list p-4 hover:bg-gray-200  hover:dark:bg-gray-900 cursor-pointer" onClick={() => setNewAddress(address)}>
											{address.full}
										</div>
									))}
								</div>
							</div>
							<div className="mt-5">
								<div className="mb-5 flex justify-center bg-gray-100 dark:bg-white-dark/10 rounded p-2">
									<div
										onClick={() => setSelectedTime('timeFrom')}
										className={
											'w-1/2 timeFrom flex justify-center items-center cursor-pointer py-3 rounded ' +
											(selectedTime === 'timeFrom' ? 'dark:bg-black/25 dark:text-white font-bold bg-gray-200' : '')
										}
									>
										<div>From:</div>
										<div className="ml-10 text-center">
											<div>{moment(timeFrom).format('MMM DD')}</div>
											<div>{moment(timeFrom).format('hh:mm A')}</div>
										</div>
									</div>
									<div
										onClick={() => setSelectedTime('timeTo')}
										className={
											'w-1/2 timeFrom flex justify-center items-center cursor-pointer py-3 rounded ' +
											(selectedTime === 'timeTo' ? 'dark:bg-black/25 dark:text-white font-bold bg-gray-200' : '')
										}
									>
										<div>To:</div>
										<div className="ml-10 text-center">
											<div>{moment(timeTo).format('MMM DD')}</div>
											<div>{moment(timeTo).format('hh:mm A')}</div>
										</div>
									</div>
								</div>
								<div className="text-[16px] dark:text-white text-right">
									{selectedTime === 'timeFrom' && (
										<TimePicker
											currentDate={timeFrom}
											options={{
												itemsHeight: 45,
												textAlign: 'right',
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
							<div className="mt-5">
								<h2>Add services</h2>

								<div className="mt-5">
									<ServicesList services={services} onRemoveService={onRemoveService} onSaveService={onSaveService} modal={modalService} setModal={setModalService} />
								</div>
							</div>
							<div className="mt-5">
								<h2>Add Technical</h2>
								<div className="mt-5">
									<TechList
										techsIds={techsIds}
										onRemoveTech={onRemoveTech}
										modal={modalTech}
										setModal={setModalTech}
										onAddRemovetechFromList={onAddRemovetechFromList}
										onSaveTeachs={onSaveTeachs}
									/>
								</div>
							</div>
							<div className="mt-8">
								<button onClick={createNewAppointment} className="btn btn-primary w-full">
									{loadingCreate ? (
										<div>
											Loading...
											<ButtonLoader />
										</div>
									) : (
										'Create appointment'
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateAppointment;
