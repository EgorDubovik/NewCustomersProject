import React, { useRef, useState } from 'react';
import { ButtonLoader } from '../../../components/loading/ButtonLoader';
import { Link } from 'react-router-dom';
import { useCreateCustomer } from './useCreateCustomer';
import IconAI from '../../../components/Icon/IconAI';
import { alertError, resizeImage } from '../../../helpers/helper';
import IconChecks from '../../../components/Icon/IconChecks';
import IconImageUpload from '../../../components/Icon/IconImageUpload';
import axios from 'axios';
const CreateCustomer = () => {
	const {
		error,
		phoneError,
		addressError,
		parseAddressValue,
		handleChangeForm,
		handleParseAddress,
		handleChangeParse,
		dataForm,
		setDataForm,
		searchSuggestionsByAddress,
		searchSuggestionsByPhone,
		suggestionResult,
		storeCustomer,
		loading,
	} = useCreateCustomer();
	const [openParse, setOpenParse] = useState(false);
	const [openAIParse, setOpenAIParse] = useState(false);
	const [AIForm, setAIForm] = useState('');
	const [AIloadingStatus, setAIloadingStatus] = useState('none');
	const [arrayReturnInputs, setArrayReturnInputs] = useState<string[]>([]);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const resizedBase64 = await resizeImage(file, 500);

		requestHandle('/upload', resizedBase64 as string);
	};

	const requestHandle = (url: string, message: string) => {
		setAIloadingStatus('loading');
		fetch(import.meta.env.VITE_AI_URL + url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: message,
			}),
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorText = await res.text();
					const statusText = res.statusText;

					throw new Error('Network response was not ok');
				}
				return res.json();
			})
			.then((data) => {
				const newDataForm = {
					name: '',
					phone: '',
					email: '',
					address1: '',
					address2: '',
					city: '',
					state: '',
					zip: '',
				};
				if (data) {
					newDataForm.name = data.name;
					newDataForm.phone = data.phone;
					newDataForm.address1 = data.address.street1;
					newDataForm.address2 = data.address.street2;
					newDataForm.city = data.address.city;
					newDataForm.state = data.address.state;
					newDataForm.zip = data.address.zip_code;
				}

				const nonEmptyKeys = Object.entries(newDataForm)
					.filter(([_, value]) => value !== '')
					.map(([key]) => key);
				setArrayReturnInputs(nonEmptyKeys);

				setDataForm({ ...dataForm, ...newDataForm });

				setAIloadingStatus('success');
			})
			.catch((err) => {
				console.log(err);
				setAIloadingStatus('error');
			})
			.finally(() => {
				window.setTimeout(() => {
					setAIloadingStatus('none');
					setArrayReturnInputs([]);
				}, 3000);
			});
	};

	const handleAIParse = () => {
		setArrayReturnInputs([]);
		if (AIForm.length < 10) {
			return;
		}

		setAIloadingStatus('loading');
		requestHandle('/', AIForm);
	};
	return (
		<div>
			<div className="flex items-center justify-between flex-wrap gap-4">
				<h2 className="text-xl">Create new customer</h2>
			</div>
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
						<div className="">
							<div className="cursor-pointer h-8" onClick={() => setOpenAIParse(!openAIParse)}>
								{AIloadingStatus === 'none' && (
									<label className="flex items-center text-primary cursor-pointer">
										<IconAI className="text-primary" />
										<span className="ml-2">{openAIParse ? 'Enter information' : 'Open AI parser'}</span>
									</label>
								)}
								{AIloadingStatus === 'loading' && (
									<label className="flex items-center text-primary">
										<ButtonLoader />
										<span className="ml-2 font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
											AI generating answer...
										</span>
									</label>
								)}
								{AIloadingStatus === 'success' && (
									<label className="flex items-center text-success">
										<IconChecks />
										<span className="ml-2">AI generated answer</span>
									</label>
								)}
								{AIloadingStatus === 'error' && (
									<label className="flex items-center text-danger">
										<span className="ml-2">AI failed to generate answer</span>
									</label>
								)}
							</div>
							{openAIParse && (
								<div className="flex items-center justify-between gap-x-2">
									<textarea
										name="AI_parse"
										className="form-input w-full"
										placeholder="Please paste information here"
										rows={2}
										value={AIForm}
										onChange={(e) => setAIForm(e.target.value)}
										onBlur={handleAIParse}
									/>
									<div
										onClick={() => fileInputRef.current?.click()}
										className="flex flex-col items-center cursor-pointer border border-gray-300 dark:border-gray-800 rounded justify-center h-full p-2 bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text"
									>
										<input ref={fileInputRef} onChange={handleFileChange} type="file" className="hidden" style={{ display: 'none' }} />
										<IconImageUpload className="text-primary " />
										<span className="text-[14px]">Upload</span>
									</div>
								</div>
							)}
						</div>
						<div className={`${arrayReturnInputs.includes('name') && 'has-success '}`}>
							<label>Customer name</label>
							<input type="text" placeholder="Name" name="name" className="transition-colors duration-500 form-input w-full" value={dataForm.name} onChange={handleChangeForm} />
						</div>
						<div className={`${phoneError && 'has-error'} ${arrayReturnInputs.includes('phone') && 'has-success'}`}>
							<label>Customer number</label>
							<input
								type="text"
								placeholder="Phone"
								name="phone"
								className="transition-colors duration-500 form-input w-full"
								value={dataForm.phone}
								onChange={handleChangeForm}
								onBlur={searchSuggestionsByPhone}
							/>
							{phoneError && <span className="text-danger text-[11px]">Phone number must be 10 digits</span>}
						</div>
						<div>
							<label>Customer Email</label>
							<input
								type="email"
								autoComplete="off"
								placeholder="Email"
								name="email"
								className="transition-colors duration-500 form-input w-full"
								value={dataForm.email}
								onChange={handleChangeForm}
							/>
						</div>
						<div className={`${addressError && 'has-error'} ${arrayReturnInputs.includes('address1') && 'has-success'}`}>
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
										className="form-input w-full "
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
								className="form-input transition-colors duration-500"
								value={dataForm.address1}
								onChange={handleChangeForm}
								onBlur={searchSuggestionsByAddress}
							/>
							{addressError && <span className="text-danger text-[11px]">Address must be at least 5 characters</span>}
						</div>

						<div className={`${arrayReturnInputs.includes('address2') && 'has-success'}`}>
							<label htmlFor="gridAddress2">Address2</label>
							<input
								id="gridAddress2"
								type="text"
								placeholder="Apartment, studio, or floor"
								name="address2"
								className="transition-colors duration-500 form-input"
								value={dataForm.address2}
								onChange={handleChangeForm}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
							<div className={`md:col-span-2 ${arrayReturnInputs.includes('city') && 'has-success'}`}>
								<label htmlFor="gridCity">City</label>
								<input id="gridCity" type="text" placeholder="Enter City" name="city" className="transition-colors duration-500 form-input" value={dataForm.city} onChange={handleChangeForm} />
							</div>
							<div className={`${arrayReturnInputs.includes('state') && 'has-success'}`}>
								<label htmlFor="gridState">State</label>
								<input
									id="gridState"
									type="text"
									placeholder="Enter State"
									name="state"
									className="transition-colors duration-500 form-input"
									value={dataForm.state}
									onChange={handleChangeForm}
								/>
							</div>
							<div className={`${arrayReturnInputs.includes('zip') && 'has-success'}`}>
								<label htmlFor="gridZip">Zip</label>
								<input id="gridZip" type="text" placeholder="Enter Zip" name="zip" className="transition-colors duration-500 form-input" value={dataForm.zip} onChange={handleChangeForm} />
							</div>
						</div>
						{suggestionResult.length > 0 && (
							<div className="my-2">
								<p>Suggetion customer</p>
								{suggestionResult.map((customer: any) => (
									<Link to={`/customer/${customer.id}`} key={customer.id}>
										<div className="dark:bg-zinc-900 p-2 rounded mt-2">
											<p>
												<span className="font-bold">{customer.name}</span>
												<span className="ml-2">{customer.phone}</span>
											</p>
											<p className="mt-1">{customer.address[0].full}</p>
										</div>
									</Link>
								))}
							</div>
						)}

						<div className="button">
							<button type="submit" className="btn btn-primary w-full" onClick={storeCustomer}>
								Create
								{loading && <ButtonLoader />}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateCustomer;
