import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconMapPin from '../../components/Icon/IconMapPin';
import IconPhone from '../../components/Icon/IconPhone';
import IconMail from '../../components/Icon/IconMail';
import IconSend from '../../components/Icon/IconSend';
import { useAppointmentContext } from './context/AppointmentContext';
import IconCopy from '../../components/Icon/IconCopy';
import { alertError, alertSuccsess, formatDate } from '../../helpers/helper';
import MapComponent from '../Customers/View/MapComponent';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { Transition, Dialog } from '@headlessui/react';
import ButtonLoader from '../../components/loading/ButtonLoader';
import { ITag } from '../../types';
import axiosClient from '../../store/axiosClient';

const CustomerInfoBlock = (props: any) => {
	const navigate = useNavigate();
	const { appointment, updateTags } = useAppointmentContext();
	const companyTags = useSelector((state: IRootState) => state.themeConfig.companyInfo.companyTags);
	const user = useSelector((state: IRootState) => state.themeConfig.user);
	const [modal, setModal] = useState(false);
	const [selectedTags, setSelectedTags] = useState<ITag[] | null>(appointment?.job?.tags || null);
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

	const copyAddress = (address: string) => {
		navigator.clipboard
			.writeText(address)
			.then(() => {
				alertSuccsess('Address copied to clipboard');
			})
			.catch((err) => {
				alertError('Failed to copy address');
			});
	};

	const addOrRemoveTag = (tag: ITag) => {
		if (selectedTags?.includes(tag)) {
			setSelectedTags(selectedTags?.filter((t) => t.id !== tag.id));
		} else {
			setSelectedTags([...(selectedTags || []), tag]);
		}
	};

	const saveTags = () => {
		axiosClient
			.post('job/tags/' + appointment?.job?.id, { tags: selectedTags?.map((t) => t.id) })
			.then((res) => {
				if (res.status === 200) {
					alertSuccsess('Tags saved successfully');
					updateTags(selectedTags || []);
				}
			})
			.catch((err) => {
				alertError('Failed to save tags');
			})
			.finally(() => {
				setModal(false);
			});
	};

	return (
		<div className="panel p-0 pb-4">
			<div className="flex items-center justify-between p-4">
				<h3 className="font-semibold text-lg dark:text-white-light">
					<Link to={'/customer/' + appointment?.customer?.id} className="hover:underline text-primary">
						{appointment?.customer?.name}
					</Link>
					<span className="ml-4">{appointment?.job?.id}</span>
				</h3>
				<Link to={'/customer/update/' + (appointment?.customer?.id ?? 0) + '?redirectTo=' + window.location.pathname} className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
					<IconPencilPaper className="w-4 h-4" />
				</Link>
			</div>
			<div className="mb-1">
				<div className="flex flex-col justify-center items-center ">
					{/* <MapComponent latitude={appointment?.job?.address?.lat} longitude={appointment?.job?.address?.lon} /> */}
					<div className="w-full h-[250px] dark:bg-gray-800 bg-gray-200 flex items-center justify-center">No Location found</div>
				</div>
				<div className="px-4 pb-4">
					<ul className="mt-5 flex flex-col m-auto space-y-4 font-semibold dark:text-white-dark">
						<li className="flex justify-between">
							<div className="flex-1 min-w-0">
								<div className="flex items-center">
									<IconMapPin className="shrink-0" />

									<a
										href={`https://www.google.com/maps?q=${encodeURIComponent(appointment?.address)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="whitespace-nowrap overflow-hidden text-ellipsis mx-2"
									>
										{appointment?.address}
									</a>
								</div>
							</div>
							{appointment?.address && (
								<button onClick={() => copyAddress(appointment?.address || 'No data')}>
									<IconCopy className="cursor-pointer hover:text-primary" />
								</button>
							)}
						</li>
						<li className="flex justify-between">
							<div className="flex">
								<IconPhone />
								<span className="whitespace-nowrap ml-2">
									<a href={`tel:${appointment?.customer.phone}`}>{appointment?.customer?.phone}</a>
								</span>
							</div>
							{appointment?.customer.phone && (
								<button onClick={() => copyPhone(appointment?.customer.phone || 'No data')}>
									<IconCopy className="cursor-pointer hover:text-primary" />
								</button>
							)}
						</li>
						<li>
							{appointment?.customer?.email ? (
								<button className="flex justify-between w-full" onClick={() => navigate('/invoice/send/' + appointment?.id)}>
									<div className="flex">
										<IconMail className="w-5 h-5 shrink-0" />
										<span className="truncate ml-2">{appointment?.customer?.email}</span>
									</div>

									<div className="flex gap-2 hover:text-primary">
										<IconSend className="w-5 h-5 shrink-0" />
										Send Invoice
									</div>
								</button>
							) : (
								<div className="flex justify-between gap-2">
									<div className="flex gap-2">
										<IconMail className="w-5 h-5 shrink-0" />
										<span className="truncate">No email</span>
									</div>
									<Link to={'/customer/update/' + (appointment?.customer?.id ?? 0) + '?redirectTo=' + window.location.pathname} className="text-primary">
										Please Add email
									</Link>
								</div>
							)}
						</li>
						<div className="border-t border-[#ebedf2] dark:border-[#191e3a] mt-4"></div>
						<div className="mt-2 flex justify-between">
							<div className="flex flex-wrap gap-2">
								{appointment?.job?.tags.map((tag: ITag, index: number) => (
									<button key={index} className={`btn btn-sm border-none text-white shadow-none`} style={{ backgroundColor: tag.color }}>
										{tag.title}
									</button>
								))}
							</div>

							{(user.roles.includes(1) || user.roles.includes(3)) && (
								<div className="mt-2 text-right min-w-fit">
									{/* Add new tag */}
									<span className="text-primary cursor-pointer" onClick={() => setModal(true)}>
										+ Add Tag
									</span>
								</div>
							)}
							{/* <div className="text-left">Invoices ({appointment?.job?.invoices.length || 0})</div>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
								{appointment?.job?.invoices.map((invoice) => (
									<div key={invoice.id} className="w-full hover:dark:bg-white-dark/10 hover:bg-gray-200 bg-gray-100 hover:text-primary dark:bg-white-dark/5 p-2 rounded">
										<Link to={'/invoice/' + invoice.id} className="">
											#{invoice.id}
											<span className="ml-1"> at {formatDate(invoice.created_at, 'MMM DD YYYY')}</span>
										</Link>
									</div>
								))}
							</div> */}
						</div>
					</ul>
				</div>
			</div>
			<Transition appear show={modal} as={Fragment}>
				<Dialog as="div" open={modal} onClose={() => setModal(false)}>
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
								<Dialog.Panel className="panel border-0 py-1 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
									<div className="py-4 px-2">
										<div className="py-4">
											<div className="title flex justify-between">
												<span className="text-dark dark:text-white-light">Assign Tags</span>
												<p className="text-[13px] text-gray-500 dark:text-gray-400">Click on tag to remove it</p>
											</div>
											<div className="mt-4">
												<div className="inline-flex flex-wrap gap-3">
													{selectedTags?.map((tag: any, index: number) => (
														<span
															className="py-1 px-4 text-[13px] rounded-md border cursor-pointer text-black dark:text-white"
															style={{ backgroundColor: tag.color, borderColor: tag.color }}
															key={index}
															onClick={() => addOrRemoveTag(tag)}
														>
															{tag.title}
														</span>
													))}
												</div>
											</div>
										</div>
										<div className="border-t border-[#ebedf2] dark:border-[#191e3a] py-4">
											<div className="title flex justify-between">
												<span className="text-dark dark:text-white-light">Choose Tags</span>
											</div>
											<div className="mt-4">
												<div className="inline-flex flex-wrap gap-3">
													{companyTags.map((tag: any) => (
														<span
															className="py-1 px-4 text-[13px] rounded-md border cursor-pointer text-black dark:text-white"
															style={{ backgroundColor: tag.color, borderColor: tag.color }}
															key={tag.id}
															onClick={() => addOrRemoveTag(tag)}
														>
															{tag.title}
														</span>
													))}
												</div>
												{companyTags.length === 0 && (
													<div className="text-center">
														<p className="text-[13px] text-gray-500 dark:text-gray-400">No tags available</p>
														<Link to="/company-settings/tags" className="text-primary">
															Please add new tags
														</Link>
													</div>
												)}
											</div>
										</div>
										<div className="flex justify-end items-center mt-10">
											<button type="button" onClick={() => setModal(false)} className="btn btn-outline-danger">
												Discard
											</button>
											<button onClick={saveTags} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
												Save
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default CustomerInfoBlock;
