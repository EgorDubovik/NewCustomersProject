import React, { useState, Fragment } from 'react';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Dialog, Transition } from '@headlessui/react';
import { SmallDangerLoader } from '../../../components/loading/SmallCirculeLoader';
import { PageCirclePrimaryLoader } from '../../../components/loading/PageLoading';
import { PageLoadError } from '../../../components/loading/Errors';
import { useUpdateCustomer } from './useUpdateCustomer';

const UpdateCustomer = () => {
	const cancelButtonRef = React.useRef(null);
	const [openParse, setOpenParse] = useState(false);
	const {
		customer,
		loadingStatus,
		loading,
		error,
		phoneError,
		updateCustomer,
		handleChangeFomr,
		addAddress,
		editAddress,
		removeAddress,
		dataAddress,
		handleChangeAddressData,
		saveAddress,
		addressError,
		parseAddressValue,
		handleChangeParse,
		handleParseAddress,
		addressFormLoading,
		removeAddressLoading,
		modal,
		setModal,
	} = useUpdateCustomer();
	console.log('customer', customer);
	return (
		<div>
			<div className="flex items-center justify-between flex-wrap gap-4">
				<h2 className="text-xl">Create new customer</h2>
			</div>
			{loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
			{loadingStatus === 'error' && <PageLoadError />}
			{loadingStatus === 'success' && (
				<div className="container w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-8">
					<div className="panel">
						<div className="flex items-center justify-between mb-5">
							<h5 className="font-semibold text-lg dark:text-white-light">Enter customer infromation</h5>
						</div>
						{error && (
							<div className="flex mt-6 mb-2 items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
								<span className="ltr:pr-2 rtl:pl-2">
									<strong className="ltr:mr-1 rtl:ml-1">Whoops!</strong>Somthing went wrong. Please try again.
								</span>
							</div>
						)}

						<form className="space-y-6">
							<div>
								<label>Customer name</label>
								<input type="text" placeholder="Name" name="name" className="form-input w-full" value={customer.name} onChange={handleChangeFomr} />
							</div>
							<div className={`${phoneError && 'has-error'}`}>
								<label>Customer number</label>
								<input type="text" placeholder="Phone" name="phone" className="form-input w-full" value={customer.phone} onChange={handleChangeFomr} />
								{phoneError && <span className="text-danger text-[11px]">Phone number must be 10 digits</span>}
							</div>
							<div>
								<label>Customer Email</label>
								<input type="email" autoComplete="off" placeholder="Email" name="email" className="form-input w-full" value={customer.email} onChange={handleChangeFomr} />
							</div>
							<div className="flex items-center justify-between mb-5">
								<h5 className="font-semibold text-lg dark:text-white-light">Addresses</h5>
							</div>

							<div className="addresses space-y-4">
								{customer.address.map((address: any, index: number) => {
									return (
										<div key={index} className="rounded flex justify-between new-address px-4 dark:text-white dark:bg-white-dark/5 hover:dark:bg-white-dark/10">
											<div className="py-4 cursor-pointer" onClick={() => editAddress(address)}>
												{address.full}
											</div>

											{removeAddressLoading === address.id ? (
												<button type="button">
													<SmallDangerLoader />
												</button>
											) : (
												<button type="button" className="text-danger" onClick={() => removeAddress(address.id)}>
													<IconTrashLines />
												</button>
											)}
										</div>
									);
								})}
								<div onClick={addAddress} className="rounded  new-address text-center py-4 dark:text-primary dark:bg-gray-800 hover:dark:bg-gray-700 cursor-pointer">
									+ Add new address
								</div>
							</div>

							<div className="button">
								<button type="submit" className="btn btn-primary w-full" onClick={updateCustomer}>
									Update
									{loading && <ButtonLoader />}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			<Transition appear show={modal} as={Fragment}>
				<Dialog as="div" open={modal} onClose={() => setModal(false)} initialFocus={cancelButtonRef}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0" />
					</Transition.Child>
					<div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
								<Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-md my-8 text-black dark:text-white-dark">
									<div className="flex items-center justify-between p-3 dark:text-white">{dataAddress.id ? <h5>Update Address</h5> : <h5>Add new address</h5>}</div>
									<div className="p-3">
										<form className="space-y-6">
											<div className={`${addressError && 'has-error'}`}>
												<div className="flex justify-between">
													<label htmlFor="gridAddress1">Address </label>
													<span className="text-primary ml-2 cursor-pointer" onClick={() => setOpenParse(!openParse)}>
														(parse)
													</span>
												</div>
												{openParse && (
													<div className="mb-5">
														<textarea
															name="parseAddress"
															className="form-input w-full"
															placeholder="Parsed address"
															rows={2}
															value={parseAddressValue}
															onChange={handleChangeParse}
															onBlur={handleParseAddress}
														/>
													</div>
												)}
												<input
													id="gridAddress1"
													type="text"
													placeholder="1234 Main St"
													name="address1"
													className="form-input"
													value={dataAddress.address1}
													onChange={handleChangeAddressData}
												/>
												{addressError && <span className="text-danger text-[11px]">Address must be at least 5 characters</span>}
											</div>

											<div>
												<label htmlFor="gridAddress2">Address 2</label>
												<input
													id="gridAddress2"
													type="text"
													placeholder="Apartment, studio, or floor"
													name="address2"
													className="form-input"
													value={dataAddress.address2}
													onChange={handleChangeAddressData}
												/>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
												<div className="md:col-span-2">
													<label htmlFor="gridCity">City</label>
													<input id="gridCity" type="text" placeholder="Enter City" name="city" className="form-input" value={dataAddress.city} onChange={handleChangeAddressData} />
												</div>
												<div>
													<label htmlFor="gridState">State</label>
													<input id="gridState" type="text" placeholder="Enter State" name="state" className="form-input" value={dataAddress.state} onChange={handleChangeAddressData} />
												</div>
												<div>
													<label htmlFor="gridZip">Zip</label>
													<input id="gridZip" type="text" placeholder="Enter Zip" name="zip" className="form-input" value={dataAddress.zip} onChange={handleChangeAddressData} />
												</div>
											</div>
											<div className="flex justify-end items-center mt-8">
												<button ref={cancelButtonRef} type="button" onClick={() => setModal(false)} className="btn btn-outline-danger">
													Discard
												</button>
												<button type="button" onClick={saveAddress} className="btn btn-primary ltr:ml-4 rtl:mr-4">
													Save
													{addressFormLoading && <ButtonLoader />}
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
		</div>
	);
};

export default UpdateCustomer;
